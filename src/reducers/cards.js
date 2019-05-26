import deckJSON from '../data/deck.json';
import suitsComparison from '../data/suitsComparison.json'
import valuesComparison from '../data/valuesComparison.json'

export default function cards(state = {}, action) {
  switch (action.type) {
    case '@@INIT': {
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
        dragged: null,
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
    }

    case 'DECK_TO_WASTE': {
      if (state.deck.length > 0) {
        const waste = [...state.waste];
        waste.push(state.deck[state.deck.length - 1]);
        const deck = state.deck.slice(0, state.deck.length - 1);
        return { ...state, deck, waste };
      }
      const deck = [...state.waste];
      return { ...state, deck, waste: [] };
    }

    case 'DRAG': {
      if (action.payload.parent.match(/tableau/)) {
        const dragged = state.tableau[parseInt(action.payload.parent.match(/\d/))][action.payload.index];
        return { ...state, dragged };
      } else if (action.payload.parent.match(/foundation/) && action.payload.index !== '') {
        const dragged = state.foundation[parseInt(action.payload.parent.match(/\d/))][action.payload.index];
        return { ...state, dragged };
      } else if (action.payload.parent === 'waste') {
        const dragged = state.waste[action.payload.index];
        return { ...state, dragged };
      }
      return state;
    }

    case 'DROP': {
      if (!state.dragged) { return state; }

      if (action.payload.parent.match(/tableau/)) {
        const dropped = state.tableau[parseInt(action.payload.parent.match(/\d/))][action.payload.index];
        if (
          valuesComparison[dropped.value] === valuesComparison[state.dragged.value] + 1
          && dropped.suit !== state.dragged.suit
          && suitsComparison[dropped.suit] !== state.dragged.suit
        ) {
          console.log('можна')
        } else {
          console.log('низзя');
        }
      } else if (action.payload.parent.match(/foundation/)) {
        const dropped = state.foundation[parseInt(action.payload.parent.match(/\d/))][action.payload.index];
        if (!dropped) {
          if (state.dragged.value === 'ace') {
            console.log('можна');
          } else {
            console.log('низзя');
          }
        } else if (
          valuesComparison[dropped.value] + 1 === valuesComparison[state.dragged.value]
          && dropped.suit === state.dragged.suit
        ) {
          console.log('можна');
        } else {
          console.log('низзя');
        }
      }

      return { ...state, dragged: null };
    }
  
    default:
      return state;
  }
}
