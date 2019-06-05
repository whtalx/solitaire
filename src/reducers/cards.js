import deckJSON from '../data/deck.json';
import valuesComparison from '../data/valuesComparison.json'

const initialState = {
  deck: [],
  waste: [],
  foundation: [
    [],
    [],
    [],
    [],
  ],
  tableau: [
    [],
    [],
    [],
    [],
    [],
    [],
    [],
  ],
  back: Math.round(Math.random() * 11),
};

deckJSON.cards.forEach((item) => {
  initialState.deck.push({
    code: item.code,
    value: item.value.toLowerCase(),
    suit: item.suit.toLowerCase(),
    status: 'downturned',
  });
});

for (let i = 1; i <= 7; i++) {
  for (let j = 1; j <= i; j++) {
    const status = j === i ? 'upturned' : 'downturned';
    initialState.tableau[i - 1].push({ ...initialState.deck.pop(), status: status });
  }
}

export default function cards(state = initialState, action) {
  switch (action.type) {
    case 'DECK': {
      const newState = { ...state };
      if (state.deck.length > 0) {
        newState.waste.push({ ...newState.deck.shift(), status: 'upturned' });
        return newState;
      }
      newState.deck = newState.waste.map((item) => {
        return { ...item, status: 'downturned' }
      });
      newState.waste = [];
      return newState;
    }

    case 'DROP': {
      const newState = { ...state };
      const { from, to } = action.payload;

      if (from.parent === 'tableau') {
        if (to.parent === 'tableau') {
          const index = from.index;
          const quantity = newState.tableau[from.parent_index].length - index;
          newState.tableau[to.parent_index].push(...newState.tableau[from.parent_index].splice(index, quantity));
        } else if (to.parent === 'foundation') {
          newState.foundation[to.parent_index].push(newState.tableau[from.parent_index].pop());
        }
      } else if (from.parent === 'waste') {
        newState[to.parent][to.parent_index].push(newState.waste.pop());
      } else if (from.parent === 'foundation') {
        newState[to.parent][to.parent_index].push(newState.foundation[from.parent_index].pop());
      }

      return newState;
    }

    case 'TURN': {
      const newState = { ...state };
      const card = action.payload;

      if (newState.tableau[card.parent_index].length - 1 === card.index) {
        newState.tableau[card.parent_index][card.index].status = 'upturned';
      }

      return newState;
    }

    case 'FUND': {
      const newState = { ...state };

      whileLoop:
      while (true) {
        if (newState.waste.length > 0) {
          const isWasteOK = canFundIt(newState.waste[newState.waste.length - 1], newState.foundation);
          if (Number.isFinite(isWasteOK)) {
            newState.foundation[isWasteOK].push(newState.waste.pop());
            continue;
          }
        }

        for (let i = 0; i < newState.tableau.length; i++) {
          if (newState.tableau[i].length > 0) {
            const isTableauOK = canFundIt(newState.tableau[i][newState.tableau[i].length - 1], newState.foundation);
            if (Number.isFinite(isTableauOK)) {
              newState.foundation[isTableauOK].push(newState.tableau[i].pop());
              continue whileLoop;
            }
          }
        }

        break;
      }

      return newState;
    }
  
    default:
      return state;
  }
}

function canFundIt(card, array) {
  for (let i = 0; i < array.length; i++) {
    if (
      array[i].length === 0
      && card.value === 'ace'
    ) {
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