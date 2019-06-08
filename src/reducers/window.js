const initialState = {
  solitaire: {
    isShowing: true,
    caption: 'Solitaire',
    buttons: ['minimize', 'maximize', 'close'],
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
    isShowing: false,
    caption: 'Select Card Back',
    buttons: ['help', 'close'],
    style: {
      width: 267,
      height: 190,
      left: null,
      top: null,
    },
  },

  options: {
    isShowing: false,
    caption: 'Options',
    buttons: ['help', 'close'],
    style: {
      width: 336,
      height: 192,
      left: null,
      top: null,
    },
  },

  help: {
    isShowing: false,
    caption: 'Solitaire',
    buttons: ['close'],
    style: {
      width: 280,
      height: 100,
      left: null,
      top: null,
    },
  },

  about: {
    isShowing: false,
    caption: 'About Solitaire',
    buttons: ['close'],
    style: {
      width: 413,
      height: 322,
      left: null,
      top: null,
    },
  },

  activity: ['solitaire'],
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

    case 'ACTIVATE': {
      const newState = { ...state };
      newState.activity.splice(newState.activity.indexOf(action.payload), 1);
      newState.activity.push(action.payload);
      return newState;
    }

    case 'CLOSE': {
      const newState = { ...state };
      if (action.payload === 'solitaire') {
        for (let key in newState) {
          if (newState[key] instanceof Array) { continue; }
          if (newState[key].isShowing) {
            newState[key].isShowing = false;
          }
        }
        return newState;
      }
      newState[action.payload].isShowing = false;
      newState[action.payload].style.left = null;
      newState[action.payload].style.top = null;
      newState.activity.splice(newState.activity.indexOf(action.payload), 1);
      return newState;
    }

    case 'SHOW_WINDOW': {
      const newState = { ...state };
      if(newState[action.payload]) {
        newState[action.payload].isShowing = true;
        if (newState.activity.includes(action.payload)) {
          newState.activity.splice(newState.activity.indexOf(action.payload), 1);
        }
        newState.activity.push(action.payload);
      }
      return newState;
    }

    default:
      return state;
  }
}