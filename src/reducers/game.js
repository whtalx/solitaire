import canFundIt from './scripts/canFundIt';
import getOptions from './scripts/getOptions';
import getCards from './scripts/getCards';
import getScore from './scripts/getScore';
import scoreFactor from './scripts/scoreFactor';

const cards = getCards();
const options = getOptions();
const score = getScore(options);

const initialState = {
  status: {
    score,
    time: 0,
    bonus: 0,
    rollsCount: 0,
    rollThrough: !(options.scoring === 'vegas' && options.draw === 'one'),
    history: [],
  },

  cards,
  options,
};

export default function game(state = initialState, action) {
  switch (action.type) {
    case 'DEAL': {
      const newState = { ...state };
      newState.cards = getCards();
      newState.status = {
        score: getScore(newState.options),
        time: 0,
        bonus: 0,
        rollsCount: 0,
        rollThrough: !(newState.options.scoring === 'vegas' && newState.options.draw === 'one'),
        history: [],
      };
      return newState;
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
      
      newState.status.score += scoreFactor[newState.options.scoring].recycleWaste;
      if (
        newState.options.scoring === 'standard'
        && newState.status.score < 0
      ) {
        newState.status.score = 0;
      }

      newState.cards.deck = newState.cards.waste.map((item) => {
        return { ...item, status: 'downturned' }
      });
      
      newState.cards.waste = [];
      newState.status.rollsCount += 1;
      if (
        newState.options.scoring === 'vegas'
        && newState.options.draw === 'three'
        && newState.status.rollsCount === 2
      ) {
        newState.status.rollThrough = false;
      }

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
          newState.status.score += scoreFactor[newState.options.scoring].tableauToFoundation;
          newState.cards.foundation[to.parent_index].push(newState.cards.tableau[from.parent_index].pop());
        }
      } else if (from.parent === 'waste') {
        if (to.parent === 'tableau') {
          newState.status.score += scoreFactor[newState.options.scoring].wasteToTableau;
        } else if (to.parent === 'foundation') {
          newState.status.score += scoreFactor[newState.options.scoring].wasteToFoundation;
        }
        newState.cards[to.parent][to.parent_index].push(newState.cards.waste.pop());
      } else if (from.parent === 'foundation') {
        newState.status.score += scoreFactor[newState.options.scoring].foundationToTableau;
        newState.cards[to.parent][to.parent_index].push(newState.cards.foundation[from.parent_index].pop());
      }

      return newState;
    }

    case 'TURN': {
      const newState = { ...state };
      const card = action.payload;

      if (newState.cards.tableau[card.parent_index].length - 1 === card.index) {
        newState.status.score += scoreFactor[newState.options.scoring].turn;
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
        if (action.payload.parent === 'tableau') {
          newState.status.score += scoreFactor[newState.options.scoring].tableauToFoundation;
        } else if (action.payload.parent === 'waste') {
          newState.status.score += scoreFactor[newState.options.scoring].wasteToFoundation;
        }

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
            newState.status.score += scoreFactor[newState.options.scoring].wasteToFoundation;
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
              newState.status.score += scoreFactor[newState.options.scoring].tableauToFoundation;
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
        localStorage.getItem('score') && localStorage.removeItem('score');
      }
      if (cumulative !== undefined) {
        newState.options.cumulative = cumulative;
        localStorage.setItem('score_cumulative', cumulative);
        if (cumulative) {
          if (localStorage.getItem('score')) {
            newState.status.score += parseInt(localStorage.getItem('score'));
          }
          localStorage.setItem('score', newState.status.score);
        } else {
          localStorage.getItem('score') && localStorage.removeItem('score');
        }
      }
      if (timed !== undefined) {
        newState.options.timed = timed;
        localStorage.setItem('game_timed', timed)
        localStorage.getItem('score') && localStorage.removeItem('score');
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
