import deckJSON from '../data/deck.json';
import suitsComparison from '../data/suitsComparison.json';
import valuesComparison from '../data/valuesComparison.json';

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

    case 'DRAG': {
      const parentIndex = parseInt(action.payload.parent.match(/\d/));
      if (action.payload.parent.match(/tableau/)) {
        if (state.tableau[parentIndex].length - 1 === action.payload.index) {
          return {
            ...state,
            dragged: [{
              ...state.tableau[parentIndex][action.payload.index],
              parent: 'tableau',
              parentIndex,
              index: action.payload.index,
            }],
          };
        } else {
          const dragged = state.tableau[parentIndex].slice(action.payload.index, state.tableau[parentIndex].length);
          dragged.forEach((item, index) => {
            dragged[index] = {
              ...item,
              parent: 'tableau',
              parentIndex,
              index: action.payload.index + index,
            };
          });
          return {
            ...state,
            dragged,
          };
        }
      } else if (action.payload.parent.match(/foundation/) && action.payload.index !== '') {
        return {
          ...state,
          dragged: [{
            ...state.foundation[parentIndex][action.payload.index],
            parent: 'foundation',
            parentIndex,
            index: action.payload.index,
          }],
        };
      } else if (action.payload.parent === 'waste') {
        return {
          ...state,
          dragged: [{
            ...state.waste[action.payload.index],
            parent: 'waste',
            index: action.payload.index,
          }],
        };
      }
      return state;
    }

    case 'DROP': {
      if (!state.dragged) { return state; }

      const parentIndex = parseInt(action.payload.parent.match(/\d/));

      if (action.payload.index === undefined) {
        if (action.payload.parent.match(/tableau/)) {
          if (state.dragged[0].value === 'king') {
            const newState = { ...state };
            switch (newState.dragged[0].parent) {
              case 'tableau': {
                const index = newState.dragged[0].index;
                const quantity = newState.tableau[newState.dragged[0].parentIndex].length - index;
                newState.tableau[parentIndex].push(...newState.tableau[newState.dragged[0].parentIndex].splice(index, quantity));
                break;
              }

              case 'foundation': {
                newState.tableau[parentIndex].push(newState.foundation[newState.dragged[0].parentIndex].pop());
                break;
              }

              case 'waste': {
                newState.tableau[parentIndex].push(newState.waste.pop());
                break;
              }

              default:
                break;
            }
            newState.dragged = null;
            return newState;
          } else {
            return { ...state, dragged: null };
          }
        } else if (action.payload.parent.match(/foundation/)) {
          if (state.dragged[0].value === 'ace') {
            const newState = { ...state };
            switch (newState.dragged[0].parent) {
              case 'tableau': {
                newState.foundation[parentIndex].push(newState.tableau[state.dragged[0].parentIndex].pop());
                break;
              }

              case 'foundation': {
                newState.foundation[parentIndex].push(newState.foundation[state.dragged[0].parentIndex].pop());
                break;
              }

              case 'waste': {
                newState.foundation[parentIndex].push(newState.waste.pop());
                break;
              }

              default:
                break;
            }
            newState.dragged = null;
            return newState;
          } else {
            return { ...state, dragged: null };
          }
        } else {
          return { ...state, dragged: null };
        }
      }

      if (action.payload.parent.match(/tableau/)) {
        const dropped = state.tableau[parentIndex][action.payload.index];
        if (
          valuesComparison[dropped.value] === valuesComparison[state.dragged[0].value] + 1
          && dropped.suit !== state.dragged[0].suit
          && suitsComparison[dropped.suit] !== state.dragged[0].suit
        ) {
          const newState = { ...state };
          switch (newState.dragged[0].parent) {
            case 'tableau': {
              const index = newState.dragged[0].index;
              const quantity = newState.tableau[newState.dragged[0].parentIndex].length - index;
              newState.tableau[parentIndex].push(...newState.tableau[newState.dragged[0].parentIndex].splice(index, quantity));
              break;
            }

            case 'foundation':
              newState.tableau[parentIndex].push(newState.foundation[newState.dragged[0].parentIndex].pop());
              break;

            case 'waste':
              newState.tableau[parentIndex].push(newState.waste.pop());
              break;
          
            default:
              break;
          }
          newState.dragged = null;
          return newState;
        }
      } else if (action.payload.parent.match(/foundation/)) {
        if (state.dragged.length > 1) {
          return { ...state, dragged: null };
        }
        
        const dragged = state.dragged[0];
        const dropped = state.foundation[parentIndex][action.payload.index];

        if (
          valuesComparison[dropped.value] + 1 === valuesComparison[dragged.value]
          && dropped.suit === dragged.suit
        ) {
          const newState = { ...state };
          switch (newState.dragged[0].parent) {
            case 'tableau': {
              newState.foundation[parentIndex].push(newState.tableau[dragged.parentIndex].pop());
              break;
            }

            case 'waste':
              newState.foundation[parentIndex].push(newState.waste.pop());
              break;
          
            default:
              break;
          }
          newState.dragged = null;
          return newState;
        }
      }

      return { ...state, dragged: null };
    }

    case 'TURN': {
      if (!action.payload.parent.match(/tableau/)) {
        return state;
      }
      const parentIndex = parseInt(action.payload.parent.match(/\d/));
      if (state.tableau[parentIndex].length - 1 === action.payload.index) {
        const tableau = [...state.tableau];
        tableau[parentIndex][tableau[parentIndex].length - 1].status = 'upturned';
        return { ...state, tableau };
      }
      return state;
    }
  
    default:
      return state;
  }
}
