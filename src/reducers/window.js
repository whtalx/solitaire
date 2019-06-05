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
    isMinimized: false,
    isMaximized: false,
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
      if (newState[window].isMaximized) {
        newState[window].style = { ...newState[window].lastStyle };
        newState[window].lastStyle = null;
        newState[window].isMaximized = false;
        return newState;
      }
      newState[window].lastStyle = { ...newState[window].style };
      newState[window].style = {
        width: 'calc(100vw - 6px)',
        height: 'calc(100vh - 32px)',
        left: 0,
        top: 26,
      };
      newState[window].isMaximized = true;
      return newState;
    }

    case 'RESIZE': {
      const newState = { ...state };
      const { top, left, width, height } = action.payload;
      Number.isFinite(width) && (newState.solitaire.style.width = width);
      Number.isFinite(height) && (newState.solitaire.style.height = height);
      Number.isFinite(left) && (newState.solitaire.style.left = left);
      Number.isFinite(top) && (newState.solitaire.style.top = top);
      return newState;
    }

    default:
      return state;
  }
}