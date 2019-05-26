export default function handleMouseUp(event) {
  if (
    !event.target.classList
    || !event.target.classList.contains('card')
  ) {
    return;
  }

  if (
    (
      event.target.classList.contains('opened')
      && !event.target.parentElement.classList.contains('waste')
    ) || (
      event.target.classList.contains('empty')
      && event.target.parentElement.classList.contains('foundation')
    )
  ) {
    this.drop(
      event.target.attributes.getNamedItem('data-parent').value,
      parseInt(event.target.attributes.getNamedItem('data-index').value)
    );
  }
}
