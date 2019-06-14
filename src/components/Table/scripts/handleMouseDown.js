import compareCards from './compareCards';

export default function handleMouseDown(event) {
  if (
    this.props.game.options.timed
    && this.timer === null
  ) {
    this.startTimer();
  }

  if (this.props.window.solitaire.isBlocked) {
    return;
  } else if (this.props.window.activity[this.props.window.activity.length - 1] !== 'solitaire') {
    this.props.activate();
  }

  if (
    !event.target.classList.contains('card')
    || event.button !== 0
    || (
      event.target.attributes.getNamedItem('data-parent')
      && event.target.dataset.parent === 'waste'
      && this.props.game.cards.waste.length !== parseInt(event.target.dataset.index) + 1
    )
  ) {
    return;
  }

  event.stopPropagation();
  const card = event.target;

  if (card.classList.contains('opened')) {
    const shiftX = event.pageX;
    const shiftY = event.pageY;
    const handleMouseMove = (event) => {
      card.style.left = event.pageX - shiftX + 'px';
      card.style.top = event.pageY - shiftY + 'px';
    }

    const handleMouseUp = () => {
      document.removeEventListener('mousemove', handleMouseMove);
      const rect = card.getBoundingClientRect();
      card.style.left = '';
      card.style.top = '';
      card.style.zIndex = '';
      
      const targets = {
        left_top: document.elementFromPoint(rect.left, rect.top),
        right_top: document.elementFromPoint(rect.right, rect.top),
        left_bottom: document.elementFromPoint(rect.left, rect.bottom),
        right_bottom: document.elementFromPoint(rect.right, rect.bottom),
      };
      for (let key in targets) {
        const target = targets[key];
        if (
          !target
          || !target.classList
          || !target.parentElement
          || target === card
        ) {
          continue;
        }
        
        if (target.classList.contains('card')) {
          if (
            target.classList.contains('opened')
            && !target.parentElement.classList.contains('waste')
            && compareCards(card, target)
          ) {
            this.props.drop.bind(this)(compareCards(card, target));
            break;
          } else {
            continue;
          }
        } else if (
          (
            target.classList.contains('tableau')
            || target.classList.contains('foundation')
          )
        &&
          compareCards(card, target)
        ) {
          this.props.drop.bind(this)(compareCards(card, target));
          break;
        }
      }
    }

    card.style.zIndex = 69;
    document.addEventListener('mouseup', handleMouseUp, { once: true });
    document.addEventListener('mousemove', handleMouseMove);

  } else if (
    card.parentElement.classList.contains('deck')
    && !card.classList.contains('not-ok')
  ) {
    this.props.draw.bind(this)(this.props.game.options.draw);
  } else if (card.classList.contains('closed')) {
    this.props.turn.bind(this)({
      parent: card.dataset.parent.match(/\w/g).join('').match(/\D/g).join(''),
      parent_index: parseInt(card.dataset.parent.match(/\d/)),
      index: parseInt(card.dataset.index),
    });
  }
}
