/* Service Worker básico */
self.addEventListener('install', evt => {
  console.log('SW instalado');
});
self.addEventListener('fetch', evt => {
  // aqui você pode adicionar cache first
});
