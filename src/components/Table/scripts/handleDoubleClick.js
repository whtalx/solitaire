export default function handleDoubleClick(event) {
  if (
    !event.target.classList.contains('opened')
    || !event.target.attributes.getNamedItem('data-parent')
    || event.target.dataset.parent.match('foundation')
    || (
      event.target.dataset.parent === 'waste'
      && this.props.cards.waste.length !== parseInt(event.target.dataset.index) + 1
    )
  ) {
    return;
  }
  
  this.props.fundOne.bind(this)({
    parent: event.target.dataset.parent.match(/\w/g).join('').match(/\D/g).join(''),
    parent_index: parseInt(event.target.dataset.parent.match(/\d/)),
    index: parseInt(event.target.dataset.index),
  })
}
