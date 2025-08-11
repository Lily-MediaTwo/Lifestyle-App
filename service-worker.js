const CACHE_NAME = 'fat-loss-tracker-v1';
const ASSETS = [
  './',
  './index.html',
  './manifest.webmanifest',
  './assets/icons/icon-192.png',
  './assets/icons/icon-512.png'
];

self.addEventListener('install', event => {
  event.waitUntil(caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS)));
  self.skipWaiting();
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys => Promise.all(keys.map(k => k !== CACHE_NAME ? caches.delete(k) : null)))
  );
  self.clients.claim();
});

self.addEventListener('fetch', event => {
  const req = event.request;
  // Network-first for HTML; cache-first for others
  if (req.mode === 'navigate' || (req.headers.get('accept') || '').includes('text/html')) {
    event.respondWith(fetch(req).then(resp => {
      const copy = resp.clone();
      caches.open(CACHE_NAME).then(c => c.put(req, copy));
      return resp;
    }).catch(() => caches.match(req)));
  } else {
    event.respondWith(caches.match(req).then(cached => cached || fetch(req)));
  }
});