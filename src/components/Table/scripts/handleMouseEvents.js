export default function handleMouseDown(event) {
  if (
    !event.target.classList
    || !event.target.classList.contains('card')
  ) {
    return;
  }

  event.stopPropagation();
  const card = event.target;
  const shiftX = event.pageX;
  const shiftY = event.pageY;
  const handleMouseMove = (event) => {
    card.style.left = event.pageX - shiftX + 'px';
    card.style.top = event.pageY - shiftY + 'px';
  }

  const handleMouseUp = (event) => {
    document.removeEventListener('mousemove', handleMouseMove);
    //const rect = card.getBoundingClientRect();
    card.style.left = '';
    card.style.top = '';
    card.style.zIndex = '';
    const target = document.elementFromPoint(event.clientX, event.clientY);

    if (
      !target
      || !target.classList
      || !target.parentElement
      || !this.props.cards.dragged
      || (
        target.classList.contains(this.props.cards.dragged[0].suit)
        && target.classList.contains(this.props.cards.dragged[0].value)
      )
    ) {
      return;
    }
    
    if (target.classList.contains('card')) {
      if (
        target.classList.contains('opened')
        && !target.parentElement.classList.contains('waste')
      ) {
        this.drop(
          target.attributes.getNamedItem('data-parent').value,
          parseInt(target.attributes.getNamedItem('data-index').value)
        );
      } else if (target.parentElement.classList.contains('foundation')) {
        this.drop(target.attributes.getNamedItem('data-parent').value);
      }
    } else if (target.classList.contains('tableau')) {
        this.drop(target.classList.item(1));
    }
  }

  if (card.classList.contains('opened')) {
    card.style.zIndex = 69;
    document.addEventListener('mouseup', handleMouseUp, { once: true });
    document.addEventListener('mousemove', handleMouseMove);

    this.drag(
      card.attributes.getNamedItem('data-parent').value,
      parseInt(card.attributes.getNamedItem('data-index').value)
    );
  } else if (card.parentElement.classList.contains('deck')) {
    this.deck();
  } else if (card.classList.contains('closed')) {
    this.turn(
      card.attributes.getNamedItem('data-parent').value,
      parseInt(card.attributes.getNamedItem('data-index').value)
    );
  }
}
