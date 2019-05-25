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
      const newState = { ...state };
      if (newState.deck.length > 0) {
        newState.waste.push(newState.deck.pop());
      } else {
        newState.deck = [...newState.waste];
        newState.waste = []
      }
      return newState;
    }

    case 'DRAG': {
      const newState = { ...state };
      action.payload.parent.match(/tableau/) ?
        newState.dragged = newState.tableau[parseInt(action.payload.parent.match(/\d/))][action.payload.index]
      :
        newState.dragged = newState[action.payload.parent][action.payload.index];
      return newState;
    }

    case 'DROP': {
      const newState = { ...state };
      let dropped = null;
      action.payload.parent.match(/tableau/) ?
        dropped = newState.tableau[parseInt(action.payload.parent.match(/\d/))][action.payload.index]
      :
        dropped = newState[action.payload.parent][action.payload.index];
        console.log(
          valuesComparison[dropped.value] === valuesComparison[newState.dragged.value] + 1
          && dropped.suit !== newState.dragged.suit
          && suitsComparison[dropped.suit] !== newState.dragged.suit
        );
      return newState;
    }
  
    default:
      return state;
  }
}
