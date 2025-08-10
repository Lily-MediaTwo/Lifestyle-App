
const CACHE='mfl-v23b-cache';
const ASSETS=['./','./index.html','./manifest.webmanifest','./assets/icons/icon-192.png','./assets/icons/icon-512.png'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(CACHE).then(c=>c.addAll(ASSETS)));self.skipWaiting()});
self.addEventListener('activate',e=>{e.waitUntil(self.clients.claim())});
self.addEventListener('fetch',e=>{
  const url=new URL(e.request.url);
  if(ASSETS.includes('./'+url.pathname.split('/').pop())){
    e.respondWith(caches.match(e.request).then(r=>r||fetch(e.request)));return;
  }
  e.respondWith(fetch(e.request).then(resp=>{const copy=resp.clone();caches.open(CACHE).then(c=>c.put(e.request,copy));return resp}).catch(()=>caches.match(e.request)));
});
