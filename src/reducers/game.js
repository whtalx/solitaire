import canFundIt from './scripts/canFundIt';
import getOptions from './scripts/getOptions';
import getCards from './scripts/getCards';
import getScore from './scripts/getScore';
import setScore from './scripts/setScore';
import saveHistory from './scripts/saveHistory';
import getStatistics from './scripts/getStatistics';
import setStatistics from './scripts/setStatistics';

const options = getOptions();
const initialState = {
  cards: getCards(),
  options,
  statistics: getStatistics(),
  status: {
    score: getScore(options),
    time: 0,
    bonus: 0,
    rollsCount: 0,
    rollThrough: !(options.scoring === 'vegas' && options.draw === 'one'),
    history: {},
    cardsInFoundation: 0,
    isCelebrating: false,
    isGameStarted: false,
    isPlaying: false,
    isDeckFetching: false,
    shouldFetchDeck: true,
  },
};

export default function game(state = initialState, action) {
  switch (action.type) {
    case 'DEAL': {
      return {
        ...state,
        cards: getCards(),
        status: {
          score: getScore(options),
          time: 0,
          bonus: 0,
          rollsCount: 0,
          rollThrough: !(options.scoring === 'vegas' && options.draw === 'one'),
          history: {},
          cardsInFoundation: 0,
          isCelebrating: false,
          isGameStarted: false,
          isPlaying: false,
          isDeckFetching: false,
          shouldFetchDeck: true,
        },
      };
    }

    case 'DRAW': {
      const newState = { ...state };
      newState.status.history = saveHistory(newState, 'deck', 'waste');

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

      newState.status.score = setScore(newState, 'recycleWaste');
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
          newState.status.history = saveHistory(newState, 'tableau');
          newState.cards.tableau[to.parent_index].push(...newState.cards.tableau[from.parent_index].splice(index, quantity));
        } else if (to.parent === 'foundation') {
          newState.status.history = saveHistory(newState, 'tableau', 'foundation');
          newState.status.score = setScore(newState, 'tableauToFoundation');
          newState.status.cardsInFoundation += 1;
          newState.cards.foundation[to.parent_index].push(newState.cards.tableau[from.parent_index].pop());
        }
      } else if (from.parent === 'waste') {
        if (to.parent === 'tableau') {
          newState.status.history = saveHistory(newState, 'waste', 'tableau');
          newState.status.score = setScore(newState, 'wasteToTableau');
        } else if (to.parent === 'foundation') {
          newState.status.history = saveHistory(newState, 'waste', 'foundation');
          newState.status.score = setScore(newState, 'wasteToFoundation');
          newState.status.cardsInFoundation += 1;
        }

        newState.cards[to.parent][to.parent_index].push(newState.cards.waste.pop());
      } else if (from.parent === 'foundation') {
        if (to.parent === 'tableau') {
          newState.status.history = saveHistory(newState, 'foundation', 'tableau');
          newState.status.score = setScore(newState, 'foundationToTableau');
          newState.status.cardsInFoundation -= 1;
        } else {
        newState.status.history = saveHistory(newState, 'foundation');
        }

        newState.cards[to.parent][to.parent_index].push(newState.cards.foundation[from.parent_index].pop());
      }

      return newState;
    }

    case 'TURN': {
      const newState = { ...state };
      const card = action.payload;

      if (newState.cards.tableau[card.parent_index].length - 1 === card.index) {
        newState.status.history = {};
        newState.status.score = setScore(newState, 'turn');
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
          newState.status.history = saveHistory(newState, 'foundation', 'tableau');
          newState.status.score = setScore(newState, 'tableauToFoundation');
          newState.cards.foundation[foundationIndex].push(newState.cards[action.payload.parent][action.payload.parent_index].pop());
        } else {
          newState.status.history = saveHistory(newState, 'foundation', 'waste');
          newState.status.score = setScore(newState, 'wasteToFoundation');
          newState.cards.foundation[foundationIndex].push(newState.cards[action.payload.parent].pop());
        }

        newState.status.cardsInFoundation += 1;
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
            newState.status.history = saveHistory(newState, 'foundation', 'waste');
            newState.status.score = setScore(newState, 'wasteToFoundation');
            newState.cards.foundation[isWasteOK].push(newState.cards.waste.pop());
            newState.status.cardsInFoundation += 1;
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
              newState.status.history = saveHistory(newState, 'foundation', 'tableau');
              newState.status.score = setScore(newState, 'tableauToFoundation');
              newState.cards.foundation[isTableauOK].push(newState.cards.tableau[i].pop());
              newState.status.cardsInFoundation += 1;
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

    case 'UNDO': {
      const newState = { ...state };

      if (
        Object.keys(newState.status.history).includes('deck')
        && newState.status.history.deck.length === 0
      ) {
        newState.status.rollsCount -= 1;
      }

      if (Object.keys(newState.status.history).includes('foundation')) {
        if (Object.keys(newState.status.history).includes('tableau')) {
          let foundationLengthWas = 0;
          let foundationLengthIs = 0;

          newState.status.history.foundation.forEach((item)  => {
            foundationLengthWas += item.length;
          });

          newState.cards.foundation.forEach((item)  => {
            foundationLengthIs += item.length;
          });

          if (foundationLengthIs < foundationLengthWas) {
            newState.status.score = setScore(newState, 'undoFoundationToTableau');
          } else {
            newState.status.score = setScore(newState, 'undoTableauToFoundation');
          }
        } else if (Object.keys(newState.status.history).includes('waste')) {
          newState.status.score = setScore(newState, 'undoWasteToFoundation');
        }
      }

      for (let key in newState.status.history) {
        newState.cards[key] = [...newState.status.history[key]];
      }

      newState.status.history = {};
      newState.status.score = setScore(newState, 'undo');
      return newState;
    }

    case 'START_GAME': {
      let newState = { ...state };
      if (!newState.status.isPlaying) {
        newState.status.isPlaying = true;
        newState = setStatistics(newState, 'played');
      }
      return newState;
    }

    case 'STOP_GAME': {
      const newState = { ...state };
      newState.status.isPlaying && (newState.status.isPlaying = false);
      return newState;
    }

    case 'TICK': {
      const newState = { ...state };
      if (!newState.status.isPlaying) { return newState; }
      newState.status.time = action.payload;
      newState.status.time % 10 === 0
        && (newState.status.score = setScore(newState, 'time'));
      return newState;
    }

    case 'START_CELEBRATING': {
      let newState = { ...state };
      newState.status.isPlaying = false;
      newState.status.isCelebrating = true;
      newState = setStatistics(newState, 'won', 'score', 'time');
      return newState;
    }

    case 'SHOOT_CARD': {
      const newState = { ...state };
      Number.isFinite(action.payload)
        && newState.cards.foundation[action.payload].pop();
      return newState;
    }

    case 'STOP_CELEBRATING': {
      const newState = { ...state };
      newState.status.isCelebrating && (newState.status.isCelebrating = false);
      return newState;
    }

    case 'SHUFFLING_DECK': {
      const newState = { ...state };
      newState.status.shouldFetchDeck = false;
      newState.status.isDeckFetching = true;
      return newState;
    }

    case 'LAY_DECK': {
      const newState = { ...state };
      newState.cards.deck = action.payload.map((item) => {
        return {
          code: item.code,
          value: item.value.toLowerCase(),
          suit: item.suit.toLowerCase(),
          status: 'downturned',
        };
      });
      newState.status.isDeckFetching = false;
      return newState;
    }

    case 'LAY_TABLEAU': {
      const newState = { ...state };
      let i = 1;

      while (i <= newState.cards.tableau.length) {
        if (newState.cards.tableau[i - 1].length < i) {
          for (let j = 1; j <= i; j++) {
            newState.cards.tableau[i - 1].push({
              ...newState.cards.deck.pop(),
              status: j === i ? 'upturned' : 'downturned',
            });
          }

          break;
        }

        i += 1;
      }

      i === 7 && (newState.status.isGameStarted = true);
      return newState;
    }

    case 'THROW_ERROR': {
      const newState = { ...state };
      newState.status.isGameStarted = true;
      return newState;
    }

    default:
      return state;
  }
}
