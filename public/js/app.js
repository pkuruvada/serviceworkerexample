window.addEventListener('load', () => {
  if (navigator.serviceWorker) {
    navigator.serviceWorker.register('/serviceworker.js')
    .then(
      (registration) => {
        console.log(registration);
      },
      (err) => {
        console.log(err);
      }
    )
  }
});
