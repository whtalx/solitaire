let back = localStorage.getItem('cards_back');
back === null && (back = Math.round(Math.random() * 11));

const initialState = {
  draw: 'one',
  scoring: 'standard',
  cumulative: false,
  timed: false,
  status: true,
  outline: false,
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

      if (draw !== undefined && draw !== newState.draw) {
        newState.draw = draw;
      }
      if (scoring !== undefined && scoring !== newState.scoring) {
        newState.scoring = scoring;
      }
      if (cumulative !== undefined && cumulative !== newState.cumulative) {
        newState.cumulative = cumulative;
      }
      if (timed !== undefined && timed !== newState.timed) {
        newState.timed = timed;
      }
      if (status !== undefined && status !== newState.status) {
        newState.status = status;
      }
      if (outline !== undefined && outline !== newState.outline) {
        newState.outline = outline;
      }

      return newState;
    }
    
    case 'SET_BACK': {
      const newState = { ...state };
      const { back } = action.payload;
      if (back !== undefined) {
        newState.back = back;
        localStorage.setItem('cards_back', back);
      }

      return newState;
    }

    default:
      return state;
  }
}