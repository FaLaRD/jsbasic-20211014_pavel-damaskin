export default function promiseClick(button) {
  const promise = new Promise((resolve, reject) => {
    button.addEventListener('click', (e) => {
      resolve(e);
    }, { once: true });
  });

  return promise;
}
