function toggleActiveButton(event) {
  Array.from(document.getElementsByClassName('btn'))
    .filter(element => element !== event.target)
    .forEach(element => {
      element.classList.remove('btn--active')
      element.setAttribute('aria-pressed', false);
    });

  event.target.classList.toggle('btn--active');
  const pressed = event.target.getAttribute('aria-pressed') === 'true';
  event.target.setAttribute('aria-pressed', String(!pressed));
}