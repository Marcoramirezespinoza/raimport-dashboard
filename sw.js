// Service worker: habilita la instalación como app (PWA) y garantiza que las
// PÁGINAS siempre lleguen FRESCAS (GitHub Pages las cachea 10 min y los teléfonos
// más — esto evita que el cliente vea versiones viejas del Radar).
self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', (e) => e.waitUntil(self.clients.claim()));
self.addEventListener('fetch', (e) => {
  const esPagina = e.request.mode === 'navigate' || e.request.destination === 'document';
  if (esPagina) {
    // Red SIN caché para el HTML; respaldo a caché solo sin conexión
    e.respondWith(fetch(e.request, { cache: 'no-store' }).catch(() => caches.match(e.request)));
  } else {
    e.respondWith(fetch(e.request).catch(() => caches.match(e.request)));
  }
});
