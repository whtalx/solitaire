export default function handleDoubleClick(event) {
  if (
    !event.target.classList.contains('opened')
    || !event.target.attributes.getNamedItem('data-parent')
    || event.target.attributes.getNamedItem('data-parent').value.match('foundation')
    || (
      event.target.attributes.getNamedItem('data-parent').value === 'waste'
      && this.props.cards.waste.length !== parseInt(event.target.attributes.getNamedItem('data-index').value) + 1
    )
  ) {
    return;
  }
  this.props.fundOne.bind(this)({
    parent: event.target.attributes.getNamedItem('data-parent').value.match(/\w/g).join('').match(/\D/g).join(''),
    parent_index: parseInt(event.target.attributes.getNamedItem('data-parent').value.match(/\d/)),
    index: parseInt(event.target.attributes.getNamedItem('data-index').value),
  })
}
