export default function handleMouseDown(event) {
  if (
    !event.target.classList
    || !event.target.classList.contains('card')
  ) {
    return;
  }

  if (event.target.classList.contains('opened')) {
    this.drag(
      event.target.attributes.getNamedItem('data-parent').value,
      parseInt(event.target.attributes.getNamedItem('data-index').value)
    );
  } else if (event.target.parentElement.classList.contains('deck')) {
    this.deck();
  } else if (event.target.classList.contains('closed')) {
    this.turn(
      event.target.attributes.getNamedItem('data-parent').value,
      parseInt(event.target.attributes.getNamedItem('data-index').value)
    );
  }
}
