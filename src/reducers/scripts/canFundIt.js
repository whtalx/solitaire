import valuesComparison from '../../data/valuesComparison.json';

export default function canFundIt(card, array) {
  for (let i = 0; i < array.length; i++) {
    if (array[i].length === 0 && card.value === 'ace') {
      return i;
    } else if (
      array[i].length > 0
      && card.suit === array[i][array[i].length - 1].suit
      && valuesComparison[card.value] === valuesComparison[array[i][array[i].length - 1].value] + 1
    ) {
      return i;
    }
  }
  return false;
}
