const draw = localStorage.getItem('cards_draw') ?
  localStorage.getItem('cards_draw')
:
  'one';

const scoring = localStorage.getItem('scoring_type') ?
  localStorage.getItem('scoring_type')
:
  'standard';

const cumulative = localStorage.getItem('score_cumulative') ?
  localStorage.getItem('score_cumulative') === 'true'
:
  false;

const timed = localStorage.getItem('game_timed') ?
  localStorage.getItem('game_timed') === 'true'
:
  false;

const status = localStorage.getItem('game_statusbar') ?
  localStorage.getItem('game_statusbar') === 'true'
:
  true;

const outline = localStorage.getItem('cards_outline') ?
  localStorage.getItem('cards_outline') === 'true'
:
  false;

const back = localStorage.getItem('cards_back') ?
  parseInt(localStorage.getItem('cards_back'))
:
  Math.round(Math.random() * 11);

const initialState = {
  draw,
  scoring,
  cumulative,
  timed,
  status,
  outline,
  back
};

export default function options(state = initialState, action) {
  switch (action.type) {
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
        newState.draw = draw;
        localStorage.setItem('cards_draw', draw);
      }
      if (scoring !== undefined) {
        newState.scoring = scoring;
        localStorage.setItem('scoring_type', scoring);
      }
      if (cumulative !== undefined) {
        newState.cumulative = cumulative;
        localStorage.setItem('score_cumulative', cumulative);
      }
      if (timed !== undefined) {
        newState.timed = timed;
        localStorage.setItem('game_timed', timed)
      }
      if (status !== undefined) {
        newState.status = status;
        localStorage.setItem('game_statusbar', status)
      }
      if (outline !== undefined) {
        newState.outline = outline;
        localStorage.setItem('cards_outline', outline);
      }

      return newState;
    }
    
    case 'SET_BACK': {
      localStorage.setItem('cards_back', action.payload);
      return { ...state, back: action.payload };
    }

    default:
      return state;
  }
}