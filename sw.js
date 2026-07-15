// Service worker mínimo: habilita la instalación como app (PWA).
// No cachea agresivo: el tablero cambia varias veces al día.
self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', (e) => e.waitUntil(self.clients.claim()));
self.addEventListener('fetch', (e) => {
  // passthrough con respaldo: si no hay red, intenta servir desde caché del navegador
  e.respondWith(fetch(e.request).catch(() => caches.match(e.request)));
});
