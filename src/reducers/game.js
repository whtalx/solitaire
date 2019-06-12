import deckJSON from '../data/deck.json';
import valuesComparison from '../data/valuesComparison.json';

const canFundIt = (card, array) => {
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

const getCards = () =>{
  const cards = {
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
  };

  deckJSON.cards.forEach((item) => {
    cards.deck.push({
      code: item.code,
      value: item.value.toLowerCase(),
      suit: item.suit.toLowerCase(),
      status: 'downturned',
    });
  });
  
  for (let i = 1; i <= 7; i++) {
    for (let j = 1; j <= i; j++) {
      cards.tableau[i - 1].push({
        ...cards.deck.pop(),
        status: j === i ? 'upturned' : 'downturned',
      });
    }
  }

  return cards;
}

const getOptions = () => {
  return {
    draw: localStorage.getItem('cards_draw') ?
      localStorage.getItem('cards_draw')
    :
      'one',

    scoring: localStorage.getItem('scoring_type') ?
      localStorage.getItem('scoring_type')
    :
      'standard',

    cumulative: localStorage.getItem('score_cumulative') ?
      localStorage.getItem('score_cumulative') === 'true'
    :
      false,

    timed: localStorage.getItem('game_timed') ?
      localStorage.getItem('game_timed') === 'true'
    :
      false,

    status: localStorage.getItem('game_statusbar') ?
      localStorage.getItem('game_statusbar') === 'true'
    :
      true,

    outline: localStorage.getItem('cards_outline') ?
      localStorage.getItem('cards_outline') === 'true'
    :
      false,

    back: localStorage.getItem('cards_back') ?
      parseInt(localStorage.getItem('cards_back'))
    :
      Math.round(Math.random() * 11),
  };
}

const initialState = {
  status: {
    score: 0,
    time: 0,
    bonus: 0,
    rollThrough: true,
    history: [],
  },

  scoring: {
    standard: {
      start: 0,
      wasteToTableau: 5,
      wasteToFoundation: 10,
      tableauToFoundation: 10,
      turn: 5,
      undo: -2,
      foundationToTableau: -15,
      recycleWaste: -100,
      time: -2,
    },
  
    vegas: {
      start: -52,
      wasteToTableau: 0,
      wasteToFoundation: 5,
      tableauToFoundation: 5,
      turn: 0,
      undo: 0,
      foundationToTableau: -5,
      recycleWaste: 0,
      time: 0,
    },
  },

  cards: getCards(),
  options: getOptions(),
};

export default function game(state = initialState, action) {
  switch (action.type) {
    case 'DEAL': {
      return { ...state, cards: getCards() };
    }

    case 'DRAW': {
      const newState = { ...state };

      if (state.cards.deck.length > 0) {
        if (action.payload === 'one') {
          newState.cards.waste.push({ ...newState.cards.deck.shift(), status: 'upturned' });
          return newState;
        } else if (action.payload === 'three') {
          newState.cards.waste = newState.cards.waste.map((item) => {
            return { ...item, draw: null }
          });
          newState.cards.waste.push(...newState.cards.deck.splice(0, 3).map((item, index) => {
            return { ...item, draw: index + 1, status: 'upturned' }
          }));
          return newState;
        }
      }

      newState.cards.deck = newState.cards.waste.map((item) => {
        return { ...item, status: 'downturned' }
      });
      
      newState.cards.waste = [];
      return newState;
    }

    case 'DROP': {
      const newState = { ...state };
      const { from, to } = action.payload;

      if (from.parent === 'tableau') {
        if (to.parent === 'tableau') {
          const index = from.index;
          const quantity = newState.cards.tableau[from.parent_index].length - index;
          newState.cards.tableau[to.parent_index].push(...newState.cards.tableau[from.parent_index].splice(index, quantity));
        } else if (to.parent === 'foundation') {
          newState.cards.foundation[to.parent_index].push(newState.cards.tableau[from.parent_index].pop());
        }
      } else if (from.parent === 'waste') {
        newState.cards[to.parent][to.parent_index].push(newState.cards.waste.pop());
      } else if (from.parent === 'foundation') {
        newState.cards[to.parent][to.parent_index].push(newState.cards.foundation[from.parent_index].pop());
      }

      return newState;
    }

    case 'TURN': {
      const newState = { ...state };
      const card = action.payload;

      if (newState.cards.tableau[card.parent_index].length - 1 === card.index) {
        newState.cards.tableau[card.parent_index][card.index].status = 'upturned';
      }

      return newState;
    }

    case 'FUND_ONE': {
      const newState = { ...state };
      let card;
      if (Number.isFinite(action.payload.parent_index)) {
        card = newState.cards[action.payload.parent][action.payload.parent_index][action.payload.index];
      } else {
        card = newState.cards[action.payload.parent][action.payload.index];
      }
      const foundationIndex = canFundIt(card, newState.cards.foundation);
      if (Number.isFinite(foundationIndex)) {
        if (Number.isFinite(action.payload.parent_index)) {
          newState.cards.foundation[foundationIndex].push(newState.cards[action.payload.parent][action.payload.parent_index].pop());
        } else {
          newState.cards.foundation[foundationIndex].push(newState.cards[action.payload.parent].pop());
        }
      }

      return newState;
    }

    case 'FUND_ALL': {
      const newState = { ...state };

      whileLoop:
      while (true) {
        if (newState.cards.waste.length > 0) {
          const isWasteOK = canFundIt(newState.cards.waste[newState.cards.waste.length - 1], newState.cards.foundation);
          if (Number.isFinite(isWasteOK)) {
            newState.cards.foundation[isWasteOK].push(newState.cards.waste.pop());
            continue;
          }
        }

        for (let i = 0; i < newState.cards.tableau.length; i++) {
          if (
            newState.cards.tableau[i].length > 0
            && newState.cards.tableau[i][newState.cards.tableau[i].length - 1].status === 'upturned'
          ) {
            const isTableauOK = canFundIt(newState.cards.tableau[i][newState.cards.tableau[i].length - 1], newState.cards.foundation);
            if (Number.isFinite(isTableauOK)) {
              newState.cards.foundation[isTableauOK].push(newState.cards.tableau[i].pop());
              continue whileLoop;
            }
          }
        }

        break;
      }

      return newState;
    }
    
    case 'SET_OPTIONS': {
      const newState = { ...state };
      const {
        draw,
        scoring,
        cumulative,
        timed,
        status,
        outline,
      } = action.payload;

      if (draw !== undefined) {
        newState.options.draw = draw;
        localStorage.setItem('cards_draw', draw);
      }
      if (scoring !== undefined) {
        newState.options.scoring = scoring;
        localStorage.setItem('scoring_type', scoring);
      }
      if (cumulative !== undefined) {
        newState.options.cumulative = cumulative;
        localStorage.setItem('score_cumulative', cumulative);
      }
      if (timed !== undefined) {
        newState.options.timed = timed;
        localStorage.setItem('game_timed', timed)
      }
      if (status !== undefined) {
        newState.options.status = status;
        localStorage.setItem('game_statusbar', status)
      }
      if (outline !== undefined) {
        newState.options.outline = outline;
        localStorage.setItem('cards_outline', outline);
      }

      return newState;
    }
    
    case 'SET_BACK': {
      const newState = { ...state };
      newState.options.back = action.payload;
      localStorage.setItem('cards_back', action.payload);
      return newState;
    }

    default:
      return state;
  }
}
