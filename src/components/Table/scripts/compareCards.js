import suitsComparison from '../../../data/suitsComparison.json';
import valuesComparison from '../../../data/valuesComparison.json';

export default function compareCards(firstCard, secondCard) {
  if (firstCard.classList.value.match(/card opened/)) {
    const first = {
      value: firstCard.classList[2],
      suit: firstCard.classList[3],
      parent: firstCard.attributes.getNamedItem('data-parent').value,
      index: parseInt(firstCard.attributes.getNamedItem('data-index').value),
    };
    if (secondCard.classList.value.match(/card opened/)) {
      const second = {
        value: secondCard.classList[2],
        suit: secondCard.classList[3],
        parent: secondCard.attributes.getNamedItem('data-parent').value,
        index: parseInt(secondCard.attributes.getNamedItem('data-index').value),
      };
      if (
        valuesComparison[first.value] === valuesComparison[second.value] + 1
        && second.parent.match(/foundation/)
        && first.suit === second.suit
      ) {
        return {
          from: {
            parent: first.parent.match(/\w/g).join('').match(/\D/g).join(''),
            parent_index: parseInt(first.parent.match(/\d/)),
            index: first.index,
          },
          to: {
            parent: second.parent.match(/\w/g).join('').match(/\D/g).join(''),
            parent_index: parseInt(second.parent.match(/\d/)),
            index: second.index,
          },
        };
      } else if (
        valuesComparison[first.value] + 1 === valuesComparison[second.value]
        && second.parent.match(/tableau/)
        && suitsComparison[first.suit] !== second.suit
        && first.suit !== second.suit
        && secondCard.children.length === 0
      ) {
        return {
          from: {
            parent: first.parent.match(/\w/g).join('').match(/\D/g).join(''),
            parent_index: parseInt(first.parent.match(/\d/)),
            index: first.index,
          },
          to: {
            parent: second.parent.match(/\w/g).join('').match(/\D/g).join(''),
            parent_index: parseInt(second.parent.match(/\d/)),
            index: second.index,
          },
        };
      }
    } else if (secondCard.classList.value.match(/foundation/)) {
      if (first.value === 'ace') {
        return {
          from: {
            parent: first.parent.match(/\w/g).join('').match(/\D/g).join(''),
            parent_index: parseInt(first.parent.match(/\d/)),
            index: first.index,
          },
          to: {
            parent: secondCard.classList[0],
            parent_index: parseInt(secondCard.classList[1].match(/\d/)),
            index: NaN,
          },
        };
      } else {
        return false;
      }
    } else if (secondCard.classList.value.match(/tableau/)) {
      if (first.value === 'king') {
        return {
          from: {
            parent: first.parent.match(/\w/g).join('').match(/\D/g).join(''),
            parent_index: parseInt(first.parent.match(/\d/)),
            index: first.index,
          },
          to: {
            parent: secondCard.classList[0],
            parent_index: parseInt(secondCard.classList[1].match(/\d/)),
            index: NaN,
          },
        };
      } else {
        return false;
      }
    }
  }
  return false;
}
