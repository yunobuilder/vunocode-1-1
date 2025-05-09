export function setupOffline() {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/sw.js')
      .then(() => console.log('Service Worker registrado'))
      .catch(err => console.error('ERRO no SW:', err));
  }
}
