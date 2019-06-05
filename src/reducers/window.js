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

    default:
      return state;
  }
}