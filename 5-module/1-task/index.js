function hideSelf() {
  const btns = document.querySelectorAll('.hide-self-button');

  if (!btns.length) {
    return;
  }

  btns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.currentTarget.hidden = true;
    });
  });
}
