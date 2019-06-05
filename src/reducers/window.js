const initialState = {
  solitaire: {
    caption: 'Solitaire',
    buttons: ['minimize', 'maximize', 'close'],
    menu: {
      showing: false,
      active: null,
    },
    style: {
      width: 585,
      height: 404,
      left: null,
      top: null,
    },
    lastStyle: null,
    minimized: false,
    maximized: false,
  },

  back: {
    caption: 'Select Card Back',
    buttons: ['help', 'close'],
    style: {
      width: 267,
      height: 182,
      left: null,
      top: null,
    },
  },

  options: {
    caption: 'Options',
    buttons: ['help', 'close'],
    style: {
      width: 336,
      height: 192,
      left: null,
      top: null,
    },
  },
};

export default function window(state = initialState, action) {
  switch (action.type) {
    case 'MOVE': {
      const { window, left, top } = action.payload;
      const newState = { ...state };
      if (newState[window]) {
        newState[window].style.left = left;
        newState[window].style.top = top;
      }
      return newState;
    }

    case 'MAXIMIZE': {
      const window = action.payload;
      const newState = { ...state };
      if (newState[window].maximized) {
        newState[window].style = newState[window].lastStyle;
        newState[window].lastStyle = null;
        newState[window].maximized = false;
        return newState;
      }
      newState[window].lastStyle = newState[window].style;
      newState[window].style = {
        width: 'calc(100vw - 6px)',
        height: 'calc(100vh - 32px)',
        left: 0,
        top: 26,
      };
      newState[window].maximized = true;
      return newState;
    }

    default:
      return state;
  }
}