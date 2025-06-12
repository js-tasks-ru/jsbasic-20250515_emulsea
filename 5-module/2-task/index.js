function toggleText() {
  // ваш код...
  const button = document.querySelector('.toggle-text-button');
  const text = document.getElementById('text');

  button.addEventListener('click', () => {
    text.hidden = !text.hidden;
  });
}
