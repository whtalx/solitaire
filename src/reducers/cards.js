import deckJSON from '../data/deck.json';

export default function cards(state = {}, action) {
  if (action.type === '@@INIT') {
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
      });
    });

    for (let i = 1; i <= 7; i++) {
      for (let j = 1; j <= i; j++) {
        initialState.tableau[i - 1].push(initialState.deck.pop());
      }
    }

    return initialState;
  } else if (action.type === 'DECK_TO_WASTE') {
    const newState = { ...state };
    if (state.deck.length > 0) {
      newState.waste.push(newState.deck.pop());
    } else {
      newState.deck = [...newState.waste];
      newState.waste = []
    }
    return newState;
  }

  return state;
}
