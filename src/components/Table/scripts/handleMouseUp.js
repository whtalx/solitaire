export default function handleMouseUp(event) {
  if (
    !event.target.classList
    || !event.target.parentElement
    || !this.props.cards.dragged
    || (
      event.target.classList.contains(this.props.cards.dragged[0].suit)
      && event.target.classList.contains(this.props.cards.dragged[0].value)
    )
  ) {
    return;
  }
  
  if (event.target.classList.contains('card')) {
    if (
      event.target.classList.contains('opened')
      && !event.target.parentElement.classList.contains('waste')
    ) {
      this.drop(
        event.target.attributes.getNamedItem('data-parent').value,
        parseInt(event.target.attributes.getNamedItem('data-index').value)
      );
    } else if (event.target.parentElement.classList.contains('foundation')) {
      this.drop(event.target.attributes.getNamedItem('data-parent').value);
    }
   } else if (event.target.classList.contains('tableau')) {
      this.drop(event.target.classList.item(1));
  }
}
