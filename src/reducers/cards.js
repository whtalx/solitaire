import deckJSON from '../data/deck.json';

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
  
    default:
      return state;
  }
}
