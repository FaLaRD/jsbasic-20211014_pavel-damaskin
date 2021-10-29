function toggleText() {
  const trigger = document.querySelector('.toggle-text-button');

  if (!trigger) {
    return;
  }

  trigger.addEventListener('click', () => {
    return (text.hidden) ? text.hidden = false : text.hidden = true;
  });
}
