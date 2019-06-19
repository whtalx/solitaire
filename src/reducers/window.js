const initialState = {
  solitaire: {
    caption: 'Solitaire',
    buttons: ['minimize', 'maximize', 'close'],
    menu: {
      categories: {
        game: {
          deal: {
            id: 0,
            type: 'menu-item',
            description: 'Deal a new game',
            function: 'deal',
            text: 'Deal F2',
          },

          break_first: {
            id: 1,
            type: 'break',
          },

          undo: {
            id: 2,
            type: 'menu-item',
            description: 'Undo last action',
            function: 'undo',
            text: 'Undo',
          },

          back: {
            id: 3,
            type: 'menu-item',
            description: 'Choose new deck back',
            function: 'back',
            text: 'Deck...',
          },

          options: {
            id: 4,
            type: 'menu-item',
            description: 'Change Solitaire options',
            function: 'options',
            text: 'Options...',
          },

          break_second: {
            id: 5,
            type: 'break',
          },

          exit: {
            id: 6,
            type: 'menu-item',
            description: 'Exit Solitaire',
            function: 'exit',
            text: 'Exit',
          },
        },

        help: {
          contents: {
            id: 0,
            type: 'menu-item',
            description: 'Index of Solitaire help topics',
            function: 'help',
            text: 'Contents F1',
          },

          search: {
            id: 1,
            type: 'menu-item',
            description: 'Search the Help Engine for a specific topic',
            function: 'help',
            text: 'Search for Help on...',
          },

          howTo: {
            id: 2,
            type: 'menu-item',
            description: 'Help using help',
            function: 'help',
            text: 'How to Use Help',
          },

          break_first: {
            id: 3,
            type: 'break',
          },

          statistics: {
            id: 4,
            type: 'menu-item',
            description: 'Game Statistics',
            function: 'statistics',
            text: 'Game Statistics',
          },
        },
      },

      hovered: null,
      isShowing: false,
    },

    status: {
      description: '',
    },

    style: {
      width: 585,
      height: 404,
      left: null,
      top: null,
    },

    foundations: [257, 339, 421, 503],

    cursor: null,
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
    alert: false,
    caption: 'Solitaire',
    buttons: ['close'],
    style: {
      width: 280,
      height: 100,
      left: null,
      top: null,
    },

    isBlocking: true,
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

  activity: ['solitaire'],
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

      if (window === 'solitaire') {
        for (let key in newState) {
          if (key === 'solitaire' || key === 'activity') { continue; }
          if (newState[key].isShowing && newState[key].isBlocking) {
            newState[key].isShowing = false;
          }
        }
      }

      newState[window].isMaximized && (newState[window].isMaximized = false);
      newState[window].isMinimized = true;
      newState[window].buttons = ['restore', 'maximize', 'close'];
      newState[window].lastStyle === null
        && (newState[window].lastStyle = { ...newState[window].style });
      newState[window].style = {
        width: 0,
        height: 0,
        left: 0,
        top: document.documentElement.clientHeight,
      };
      return newState;
    }

    case 'MAXIMIZE': {
      const newState = { ...state };
      const window = action.payload;
      if (!newState[window]) { return newState; }

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

      newState[window].style = { ...newState[window].lastStyle };
      newState[window].lastStyle = null;
      newState[window].isMinimized = false;
      newState[window].isMaximized = false;
      newState[window].buttons = ['minimize', 'maximize', 'close'];

      if (window === 'solitaire') {
        newState.activity.forEach((item) => {
          if (!newState[item].isShowing && newState[item].isBlocking) {
            newState[item].isShowing = true;
          }
        });
        newState.activity.splice(newState.activity.indexOf('solitaire'), 1);
        newState.activity.unshift('solitaire');
      }

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

      newState.activity.indexOf('') >= 0 && newState.activity.splice(newState.activity.indexOf(''), 1);
      newState.activity.splice(newState.activity.indexOf(window), 1);
      newState.activity.push(window);
      return newState;
    }

    case 'DEACTIVATE': {
      const newState = { ...state };
      if (newState.activity.indexOf('') >= 0) { return newState; }
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
          if (newState[key] instanceof Array) { continue; }
          if (newState[key].isShowing) {
            newState[key].isShowing = false;
          }
        }
        return newState;
      } else if (newState[window].isBlocking) {
        newState.solitaire.isBlocked = false;
      }

      newState[window].isShowing = false;
      newState[window].style.left = null;
      newState[window].style.top = null;
      newState.activity.splice(newState.activity.indexOf(window), 1);
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

    case 'CURSOR': {
      const newState = { ...state };
      const { window, cursor } = action.payload;
      if (!newState[window] || !newState[window].isResizable) { return newState; }
      newState[window].cursor = cursor;
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

    case 'FOUNDATIONS_MOVED': {
      const newState = { ...state };
      action.payload.forEach((item, index) => {
        Number.isFinite(item) && (newState.solitaire.foundations[index] = item);
      });
      return newState;
    }

    default:
      return state;
  }
}