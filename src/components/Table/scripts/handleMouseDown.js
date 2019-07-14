import compareCards from './compareCards';

export default function handleMouseDown(event) {
  if (this.props.window.solitaire.isBlocked) {
    return;
  } else if (
    this.props.window.activity[this.props.window.activity.length - 1] !== 'solitaire'
  ) {
    this.props.activate();
  }

  if (!this.props.game.status.isGameStarted) { return; }

  if (event.button !== 0) {
    event.button === 2 && this.props.fundAll();
    return;
  }

  if (!this.props.game.status.isPlaying) {
    this.startGame();
  }

  if (
    !event.target.classList.contains('card')
    || (
      event.target.attributes.getNamedItem('data-parent')
      && event.target.dataset.parent === 'waste'
      && this.props.game.cards.waste.length !== parseInt(event.target.dataset.index) + 1
    )
    || (
      event.target.attributes.getNamedItem('data-parent')
      && event.target.dataset.parent === 'deck'
      && this.props.game.cards.deck.length !== parseInt(event.target.dataset.index) + 1
    )
  ) {
    return;
  }

  event.stopPropagation();

  if (event.target.classList.contains('opened')) {
    let card = event.target;
    let moveCard = false;
    let targetPlace = null;
    const parentElement = card.parentElement;
    const isOutline = this.props.game.options.outline;

    if (isOutline) {
      card = card.cloneNode(true);
      card.classList.add('outline');
      card.style.display = 'none';
      parentElement.appendChild(card);
    }

    card.style.zIndex = 69;

    const shiftX = event.pageX;
    const shiftY = event.pageY;
    const handleMouseMove = (event) => {
      card.style.display === 'none' && (card.style.display = '');
      card.style.transform = `translate(${event.pageX - shiftX}px,${event.pageY - shiftY}px)`;

      const getTarget = (horizontal, vertical) => {
        const getElementsFromPoint = (x, y) => document.msElementsFromPoint
            ? document.msElementsFromPoint(x, y)
            : document.elementsFromPoint(x, y);

        const elements = getElementsFromPoint(horizontal, vertical);
        if (Array.from(elements).includes(card)) {
          return elements[Array.from(elements).indexOf(card) + 1];
        }

        return elements[0];
      }

      const rect = card.getBoundingClientRect();
      const targets = {
        left_top: getTarget(rect.left + 1, rect.top + 1),
        right_top: getTarget(rect.left + 69, rect.top + 1),
        left_bottom: getTarget(rect.left + 1, rect.top + 94),
        right_bottom: getTarget(rect.left + 69, rect.top + 94),
      };

      let counter = 0;
      for (let key in targets) {
        counter++;
        const target = targets[key];
        if (
          !target
          || !target.classList
          || !target.parentElement
          || target === card
        ) {
          if (counter === 4 && targetPlace !== null) {
            isOutline && targetPlace.classList.remove('inverted');
            targetPlace = null;
            moveCard = false;
          }

          continue;
        }

        if (target === targetPlace) {
          break;
        } else if (target.classList.contains('card')) {
          if (
            target.classList.contains('opened')
            && !target.parentElement.classList.contains('waste')
            && compareCards(card, target)
          ) {
            moveCard = compareCards(card, target);

            if (targetPlace !== null && isOutline) {
              targetPlace.classList.remove('inverted');
            }

            targetPlace = target;
            isOutline && targetPlace.classList.add('inverted');
            break;
          } else {
          continue;
          }
        } else if (
          (
            target.classList.contains('tableau')
            || target.classList.contains('foundation')
          )
          && compareCards(card, target)
        ) {
          moveCard = compareCards(card, target);

          if (targetPlace !== null && isOutline) {
            targetPlace.classList.remove('inverted');
          }

          targetPlace = target;
          isOutline && targetPlace.classList.add('inverted');
          break;
        } else if (counter === 4 && targetPlace !== null) {
          isOutline && targetPlace.classList.remove('inverted');
          targetPlace = null;
          moveCard = false;
        }
      }
    }

    const handleMouseUp = () => {
      document.removeEventListener('mousemove', handleMouseMove);
      if (isOutline) {
        parentElement.removeChild(card);
      } else {
        card.style.transform = '';
        card.style.zIndex = '';
      }

      if (targetPlace) {
        this.props.drop.bind(this)(moveCard);
        isOutline && targetPlace.classList.remove('inverted');
      }
    }

    document.addEventListener('mouseup', handleMouseUp, { once: true });
    document.addEventListener('mousemove', handleMouseMove);

  } else if (
    event.target.parentElement.classList.contains('deck')
    && !event.target.classList.contains('not-ok')
  ) {
    this.props.draw.bind(this)(this.props.game.options.draw);
  } else if (
    event.target.classList.contains('closed')
    && event.target.children.length === 0
  ) {
    this.props.turn.bind(this)({
      parent: event.target.dataset.parent.match(/\w/g).join('').match(/\D/g).join(''),
      parent_index: parseInt(event.target.dataset.parent.match(/\d/)),
      index: parseInt(event.target.dataset.index),
    });
  }
}
