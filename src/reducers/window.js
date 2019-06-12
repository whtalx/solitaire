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
    cursor: null,
    lastStyle: null,
    isMinimized: false,
    isMaximized: false,
    isResizing: false,
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

  restart: {
    isShowing: false,
    caption: 'Solitaire',
    buttons: ['close'],
    style: {
      width: 179,
      height: 94,
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

    case 'MINIMIZE': {
      const newState = { ...state };
      for (let key in newState) {
        if (key === 'solitaire' || key === 'activity') { continue; }
        if (newState[key].isShowing) {
          newState[key].isShowing = false;
        }
      }

      newState.solitaire.lastStyle === null && (
        newState.solitaire.lastStyle = { ...newState.solitaire.style }
      );
      newState.solitaire.style = {
        width: 0,
        height: 0,
        left: 0,
        top: document.documentElement.clientHeight,
      };

      newState.solitaire.isMaximized && (newState.solitaire.isMaximized = false);
      newState.solitaire.isMinimized = true;
      newState.solitaire.buttons = ['restore', 'maximize', 'close'];
      return newState;
    }

    case 'MAXIMIZE': {
      const newState = { ...state };
      newState.solitaire.lastStyle === null && (newState.solitaire.lastStyle = { ...newState.solitaire.style });
      newState.solitaire.style = {
        width: '',
        height: '',
        left: 0,
        top: 26,
      };

      newState.solitaire.isMinimized && (newState.solitaire.isMinimized = false);
      newState.solitaire.isMaximized = true;
      newState.solitaire.buttons = ['minimize', 'restore', 'close'];
      return newState;
    }

    case 'RESTORE': {
      const newState = { ...state };
      newState.solitaire.style = { ...newState.solitaire.lastStyle };
      newState.solitaire.lastStyle = null;
      newState.solitaire.isMinimized = false;
      newState.solitaire.isMaximized = false;
      newState.solitaire.buttons = ['minimize', 'maximize', 'close'];

      newState.activity.forEach((item) => {
        newState[item].isShowing = true;
      });
      newState.activity.splice(newState.activity.indexOf('solitaire'), 1);
      newState.activity.unshift('solitaire');

      return newState;
    }

    case 'START_RESIZING': {
      const newState = { ...state };
      newState.solitaire.isResizing = true;
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

    case 'END_RESIZING': {
      const newState = { ...state };
      newState.solitaire.isResizing = false;
      return newState;
    }

    case 'ACTIVATE': {
      const newState = { ...state };
      if (newState.activity.indexOf('') >= 0) {
        newState.activity.splice(newState.activity.indexOf(''), 1);
      }
      newState.activity.splice(newState.activity.indexOf(action.payload), 1);
      newState.activity.push(action.payload);
      return newState;
    }

    case 'DEACTIVATE': {
      const newState = { ...state };
      newState.activity.push('');
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

    case 'CURSOR': {
      const newState = { ...state };

      if (action.payload) {
        newState.solitaire.cursor = action.payload;
      } else {
        newState.solitaire.cursor = null;
      }

      return newState;
    }

    default:
      return state;
  }
}