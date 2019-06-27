import menu from '../data/solitaireMenu';

const initialState = {
  solitaire: {
    caption: 'Solitaire',
    buttons: ['minimize', 'maximize', 'close'],
    menu,

    status: {
      description: '',
    },

    style: {
      width: 585,
      height: 404,
      left: null,
      top: null,
    },

    lastStyle: null,
    isBlocked: false,
    isMaximized: false,
    isMinimized: false,
    isResizing: false,
    isResizable: true,
    isShowing: true,
  },

  back: {
    alert: false,
    caption: 'Select Card Back',
    buttons: ['help', 'close'],
    style: {
      width: 267,
      height: 190,
      left: null,
      top: null,
    },

    isBlocking: true,
    isShowing: false,
  },

  options: {
    alert: false,
    caption: 'Options',
    buttons: ['help', 'close'],
    style: {
      width: 336,
      height: 192,
      left: null,
      top: null,
    },

    isBlocking: true,
    isShowing: false,
  },

  help: {
    caption: 'Solitaire',
    buttons: ['minimize', 'maximize', 'close'],
    style: {
      width: 542,
      height: 416,
      left: null,
      top: null,
    },

    lastStyle: null,
    isBlocking: false,
    isMaximized: false,
    isMinimized: false,
    isResizing: false,
    isResizable: true,
    isShowing: false,
  },

  restart: {
    alert: false,
    caption: 'Solitaire',
    buttons: ['close'],
    style: {
      width: 179,
      height: 94,
      left: null,
      top: null,
    },

    isBlocking: true,
    isShowing: false,
  },

  statistics: {
    alert: false,
    caption: 'Statistics',
    buttons: ['close'],
    style: {
      width: 413,
      height: 322,
      left: null,
      top: null,
    },

    isBlocking: true,
    isShowing: false,
  },

  error: {
    alert: false,
    caption: 'Solitaire',
    buttons: ['close'],
    message: 'unknown error',
    style: {
      width: 500,
      height: 100,
      left: null,
      top: null,
    },

    isBlocking: true,
    isShowing: false,
  },

  activity: ['solitaire'],
  minimized: [],
  cursor: null,
  isCursorFreezed: false,
};

export default function window(state = initialState, action) {
  switch (action.type) {
    case 'MOVE': {
      const newState = { ...state };
      const { window, left, top } = action.payload;
      if (!newState[window]) { return newState; }

      newState[window].style.left = left;
      newState[window].style.top = top;
      return newState;
    }

    case 'MINIMIZE': {
      const newState = { ...state };
      const window = action.payload;
      if (!newState[window]) { return newState; }

      newState[window].isMaximized && (newState[window].isMaximized = false);
      newState[window].isMinimized = true;
      newState[window].buttons = ['restore', 'maximize', 'close'];
      newState.minimized.push(window);
      newState[window].lastStyle === null
        && (newState[window].lastStyle = { ...newState[window].style });
      newState[window].style = {
        width: 0,
        height: 0,
        left: newState.minimized.indexOf(window) * 151,
        top: document.documentElement.clientHeight,
      };
      return newState;
    }

    case 'MAXIMIZE': {
      const newState = { ...state };
      const window = action.payload;
      if (!newState[window]) { return newState; }

      if (newState.minimized.includes(window)) {
        newState.minimized.splice(newState.minimized.indexOf(window), 1);

        if (newState.minimized.length > 0) {
          newState.minimized.forEach(item => {
            newState[item].style.left = newState.minimized.indexOf(item) * 151;
          });
        }
      }

      newState[window].isMinimized && (newState[window].isMinimized = false);
      newState[window].isMaximized = true;
      newState[window].buttons = ['minimize', 'restore', 'close'];
      newState[window].lastStyle === null
        && (newState[window].lastStyle = { ...newState[window].style });
      newState[window].style = {
        width: '',
        height: '',
        left: 0,
        top: 26,
      };
      return newState;
    }

    case 'RESTORE': {
      const newState = { ...state };
      const window = action.payload;
      if (!newState[window]) { return newState; }

      if (newState.minimized.includes(window)) {
        newState.minimized.splice(newState.minimized.indexOf(window), 1);

        if (newState.minimized.length > 0) {
          newState.minimized.forEach(item => {
            newState[item].style.left = newState.minimized.indexOf(item) * 151;
          });
        }
      }

      newState[window].style = { ...newState[window].lastStyle };
      newState[window].lastStyle = null;
      newState[window].isMinimized = false;
      newState[window].isMaximized = false;
      newState[window].buttons = ['minimize', 'maximize', 'close'];

      return newState;
    }

    case 'RESIZE': {
      const newState = { ...state };
      const { window, top, left, width, height } = action.payload;
      if (!newState[window] || !newState[window].isResizable) { return newState; }

      Number.isFinite(width) && (newState[window].style.width = width);
      Number.isFinite(height) && (newState[window].style.height = height);
      Number.isFinite(left) && (newState[window].style.left = left);
      Number.isFinite(top) && (newState[window].style.top = top);

      return newState;
    }

    case 'ACTIVATE': {
      const newState = { ...state };
      const window = action.payload;
      if (!newState[window]) { return newState; }

      if (newState[window].isBlocked) {
        if (newState.activity.indexOf(window) + 1 < newState.activity.length - 1) {
          newState.activity.indexOf('') >= 0
            && newState.activity.splice(newState.activity.indexOf(''), 1);
          const part = newState.activity.splice(newState.activity.indexOf(window), 2);
          newState.activity.push(...part);
          return newState;
        } else if (newState.activity.indexOf(window) + 1 === newState.activity.length - 1) {
          !newState[newState.activity[newState.activity.length - 1]].alert
            && (newState[newState.activity[newState.activity.length - 1]].alert = true);
          return newState;
        }
      }

      newState.activity.includes('') && newState.activity.splice(newState.activity.indexOf(''), 1);
      newState.activity.splice(newState.activity.indexOf(window), 1);
      newState.activity.push(window);
      return newState;
    }

    case 'DEACTIVATE': {
      const newState = { ...state };
      if (
        newState.activity.length === 0
        || newState.activity.includes('')
      ) {
        return newState;
      }

      newState.activity.forEach((item) => {
        if (
          newState[item]
          && newState[item].alert
        ) {
          newState[item].alert = false;
        }
      });

      newState.activity.push('');
      return newState;
    }

    case 'CANCEL_ALERT': {
      const newState = { ...state };
      const window = action.payload;
      if (!newState[window]) { return newState; }

      if (newState[window].alert) {
        newState[window].alert = false;
      }

      return newState;
    }

    case 'CLOSE': {
      const newState = { ...state };
      const window = action.payload;
      if (!newState[window]) { return newState; }


      if (window === 'solitaire') {
        for (let key in newState) {
          if (newState[key] && newState[key].isShowing) {
            newState[key].isShowing = false;
            newState.activity.splice(newState.activity.indexOf(key), 1);
          }
        }
      } else if (newState[window].isBlocking) {
        newState.solitaire.isBlocked = false;
      }

      newState[window].isShowing = false;
      newState[window].style.left = null;
      newState[window].style.top = null;
      newState.activity.splice(newState.activity.indexOf(window), 1);

      if (
        newState[window].isMaximized
        || newState[window].isMinimized
      ) {
        newState[window].style = { ...newState[window].lastStyle };
        newState[window].lastStyle = null;
        newState[window].isMinimized = false;
        newState[window].isMaximized = false;
        newState[window].buttons = ['minimize', 'maximize', 'close'];

        if (newState.minimized.includes(window)) {
          newState.minimized.splice(newState.minimized.indexOf(window), 1);

          if (newState.minimized.length > 0) {
            newState.minimized.forEach(item => {
              newState[item].style.left = newState.minimized.indexOf(item) * 151;
            });
          }
        }
      }

      return newState;
    }

    case 'SHOW_WINDOW': {
      const newState = { ...state };
      const window = action.payload;
      if (!newState[window]) { return newState; }

      if (
        window !== 'solitaire'
        && newState[action.payload].isBlocking
      ) {
        newState.solitaire.isBlocked = true;
      }

      newState[window].isShowing = true;

      newState.activity.includes(window)
        && newState.activity.splice(newState.activity.indexOf(window), 1);
      newState.activity.push(window);

      return newState;
    }

    case 'CHANGE_CURSOR': {
      const newState = { ...state };
      const { window, cursor } = action.payload;
      if (!newState[window] || !newState[window].isResizable) { return newState; }
      newState.cursor = cursor;
      return newState;
    }

    case 'SHOW_MENU': {
      const newState = { ...state };
      const { window, show } = action.payload;
      if (!newState[window] || !newState[window].menu) { return newState; }

      if (show) {
        newState[window].menu.isShowing = true;
      } else {
        newState[window].menu.isShowing = false;
        newState[window].menu.hovered = null;
        newState[window].status.description = '';
      }

      return newState;
    }

    case 'HOVER_MENU': {
      const newState = { ...state };
      const { window, hover } = action.payload;
      if (!newState[window] || !newState[window].menu) { return newState; }
      newState[window].menu.hovered = hover;
      return newState;
    }

    case 'DESCRIBE_MENU': {
      const newState = { ...state };
      const { window, describe } = action.payload;
      if (!newState[window] || !newState[window].menu) { return newState; }

      action.payload.describe
        ? newState[window].status.description = newState[window].menu.categories[newState[window].menu.hovered][describe].description
        : newState[window].status.description = '';

      return newState;
    }

    case 'FREEZE_CURSOR': {
      const newState = { ...state };
      newState.isCursorFreezed = action.payload;
      return newState;
    }

    case 'THROW_ERROR': {
      const newState = { ...state };
      newState.error.message = action.payload;
      return newState;
    }

    default:
      return state;
  }
}