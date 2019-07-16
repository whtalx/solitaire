import suitsComparison from '../../../data/suitsComparison.json';
import valuesComparison from '../../../data/valuesComparison.json';

export default function compareCards(firstCard, secondCard) {
  if (!firstCard.className.match(/card opened/)) { return false; }

  const first = {
    value: firstCard.classList[2],
    suit: firstCard.classList[3],
    parent: firstCard.dataset.parent.match(/\w/g).join('').match(/\D/g).join(''),
    parent_index: parseInt(firstCard.dataset.parent.match(/\d/)),
    index: parseInt(firstCard.dataset.index),
  };

  if (secondCard.className.match(/card opened/)) {
    const second = {
      value: secondCard.classList[2],
      suit: secondCard.classList[3],
      parent: secondCard.dataset.parent.match(/\w/g).join('').match(/\D/g).join(''),
      parent_index: parseInt(secondCard.dataset.parent.match(/\d/)),
      index: parseInt(secondCard.dataset.index),
    };

    const moveToFoundation =
      second.parent.match(/foundation/)
      && first.suit === second.suit
      && valuesComparison[first.value] === valuesComparison[second.value] + 1;

    const moveToTableau =
      second.parent.match(/tableau/)
      && secondCard.children.length === 0
      && first.suit !== second.suit
      && suitsComparison[first.suit] !== second.suit
      && valuesComparison[first.value] + 1 === valuesComparison[second.value];

    if (moveToFoundation || moveToTableau) {
      return {
        from: {
          parent: first.parent,
          parent_index: first.parent_index,
          index: first.index,
        },

        to: {
          parent: second.parent,
          parent_index: second.parent_index,
          index: second.index,
        },
      };
    } else {
      return false;
    }
  }

  const moveToEmptyFoundation =
    secondCard.classList.value.match(/foundation/)
    && first.value === 'ace';

  const moveToEmptyTableau =
    secondCard.className.match(/tableau/)
    && first.value === 'king';

  if (moveToEmptyFoundation || moveToEmptyTableau) {
    return {
      from: {
        parent: first.parent,
        parent_index: first.parent_index,
        index: first.index,
      },

      to: {
        parent: secondCard.classList[0],
        parent_index: parseInt(secondCard.classList[1].match(/\d/)),
        index: NaN,
      },
    };
  }

  return false;
}
