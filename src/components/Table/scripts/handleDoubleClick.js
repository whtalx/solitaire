export default function handleDoubleClick(event) {
  if (
    this.props.window.solitaire.isBlocked
    || event.button !== 0
    || !event.target.classList.contains('opened')
    || !event.target.attributes.getNamedItem('data-parent')
    || event.target.dataset.parent.match('foundation')
    || (
      event.target.dataset.parent === 'waste'
      && this.props.game.cards.waste.length !== parseInt(event.target.dataset.index) + 1
    )
  ) {
    return;
  }

  this.props.fundOne.bind(this)({
    parent: event.target.dataset.parent.match(/\w/g).join('').match(/\D/g).join(''),
    parent_index: parseInt(event.target.dataset.parent.match(/\d/)),
    index: parseInt(event.target.dataset.index),
  });
}
