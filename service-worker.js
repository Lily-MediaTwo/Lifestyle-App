const CACHE_NAME = 'mfl-tracker-v1.0.0';
const STATIC_CACHE_NAME = 'mfl-static-v1.0.0';
const RUNTIME_CACHE_NAME = 'mfl-runtime-v1.0.0';

// Files to cache immediately on install
const STATIC_ASSETS = [
  './',
  './index.html',
  './manifest.webmanifest',
  './assets/icons/icon-72.png',
  './assets/icons/icon-96.png',
  './assets/icons/icon-128.png',
  './assets/icons/icon-144.png',
  './assets/icons/icon-152.png',
  './assets/icons/icon-192.png',
  './assets/icons/icon-384.png',
  './assets/icons/icon-512.png'
];

// Install event - cache static assets
self.addEventListener('install', event => {
  console.log('🔧 Service Worker installing...');
  
  event.waitUntil(
    Promise.all([
      caches.open(STATIC_CACHE_NAME).then(cache => {
        console.log('📦 Caching static assets');
        return cache.addAll(STATIC_ASSETS);
      })
    ]).then(() => {
      console.log('✅ Service Worker installed successfully');
      // Force the new service worker to activate immediately
      return self.skipWaiting();
    }).catch(error => {
      console.error('❌ Service Worker install failed:', error);
    })
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', event => {
  console.log('🚀 Service Worker activating...');
  
  event.waitUntil(
    caches.keys().then(cacheNames => {
      const deletePromises = cacheNames
        .filter(cacheName => {
          // Delete old versions of our caches
          return (
            cacheName.startsWith('mfl-') && 
            cacheName !== STATIC_CACHE_NAME && 
            cacheName !== RUNTIME_CACHE_NAME
          );
        })
        .map(cacheName => {
          console.log('🗑️ Deleting old cache:', cacheName);
          return caches.delete(cacheName);
        });
      
      return Promise.all(deletePromises);
    }).then(() => {
      console.log('✅ Service Worker activated');
      // Take control of all pages immediately
      return self.clients.claim();
    }).catch(error => {
      console.error('❌ Service Worker activation failed:', error);
    })
  );
});

// Fetch event - serve cached content when offline
self.addEventListener('fetch', event => {
  const { request } = event;
  const url = new URL(request.url);
  
  // Only handle requests from our origin
  if (url.origin !== location.origin) {
    return;
  }

  // Handle different types of requests
  if (request.method === 'GET') {
    event.respondWith(handleGetRequest(request));
  }
});

async function handleGetRequest(request) {
  const url = new URL(request.url);
  
  try {
    // For the root path or index.html, always try network first for updates
    if (url.pathname === '/' || url.pathname === '/index.html') {
      return await networkFirst(request);
    }
    
    // For static assets, try cache first
    if (STATIC_ASSETS.some(asset => url.pathname.endsWith(asset.replace('./', '')))) {
      return await cacheFirst(request);
    }
    
    // For other requests, try network first
    return await networkFirst(request);
    
  } catch (error) {
    console.error('❌ Fetch handler error:', error);
    
    // Fallback to offline page if available
    const cache = await caches.open(STATIC_CACHE_NAME);
    const cachedResponse = await cache.match('./index.html');
    return cachedResponse || new Response('App is offline', { 
      status: 503, 
      statusText: 'Service Unavailable' 
    });
  }
}

// Cache first strategy - good for static assets
async function cacheFirst(request) {
  const cache = await caches.open(STATIC_CACHE_NAME);
  const cachedResponse = await cache.match(request);
  
  if (cachedResponse) {
    console.log('📦 Served from cache:', request.url);
    return cachedResponse;
  }
  
  console.log('🌐 Fetching from network:', request.url);
  const networkResponse = await fetch(request);
  
  // Cache the response for future use
  if (networkResponse.ok) {
    cache.put(request, networkResponse.clone());
  }
  
  return networkResponse;
}

// Network first strategy - good for HTML and data
async function networkFirst(request) {
  try {
    console.log('🌐 Trying network first:', request.url);
    const networkResponse = await fetch(request);
    
    // Cache successful responses
    if (networkResponse.ok) {
      const cache = await caches.open(RUNTIME_CACHE_NAME);
      cache.put(request, networkResponse.clone());
    }
    
    return networkResponse;
    
  } catch (error) {
    console.log('📦 Network failed, trying cache:', request.url);
    
    // Try static cache first
    const staticCache = await caches.open(STATIC_CACHE_NAME);
    const staticCachedResponse = await staticCache.match(request);
    if (staticCachedResponse) {
      return staticCachedResponse;
    }
    
    // Then try runtime cache
    const runtimeCache = await caches.open(RUNTIME_CACHE_NAME);
    const runtimeCachedResponse = await runtimeCache.match(request);
    if (runtimeCachedResponse) {
      return runtimeCachedResponse;
    }
    
    throw error;
  }
}

// Handle background sync for offline actions
self.addEventListener('sync', event => {
  console.log('🔄 Background sync event:', event.tag);
  
  if (event.tag === 'background-sync-data') {
    event.waitUntil(syncData());
  }
});

async function syncData() {
  try {
    // Here you could sync any pending data when back online
    console.log('🔄 Syncing data...');
    
    // For now, just log that we're back online
    const clients = await self.clients.matchAll();
    clients.forEach(client => {
      client.postMessage({
        type: 'SYNC_COMPLETE',
        message: 'Data synced successfully'
      });
    });
    
  } catch (error) {
    console.error('❌ Data sync failed:', error);
  }
}

// Handle push notifications (for future features)
self.addEventListener('push', event => {
  console.log('🔔 Push notification received');
  
  const options = {
    body: 'Time for your workout!',
    icon: './assets/icons/icon-192.png',
    badge: './assets/icons/icon-96.png',
    vibrate: [200, 100, 200],
    tag: 'workout-reminder',
    actions: [
      {
        action: 'view',
        title: 'View Schedule'
      },
      {
        action: 'dismiss',
        title: 'Dismiss'
      }
    ]
  };
  
  if (event.data) {
    const data = event.data.json();
    options.body = data.body || options.body;
    options.title = data.title || 'Morning Fat Loss';
  }
  
  event.waitUntil(
    self.registration.showNotification('Morning Fat Loss', options)
  );
});

// Handle notification clicks
self.addEventListener('notificationclick', event => {
  console.log('🔔 Notification clicked:', event.action);
  
  event.notification.close();
  
  if (event.action === 'view') {
    event.waitUntil(
      self.clients.openWindow('./')
    );
  }
});

// Listen for messages from the main app
self.addEventListener('message', event => {
  console.log('📨 Message received:', event.data);
  
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

console.log('🔧 Service Worker script loaded');
