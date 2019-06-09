const initialState = {
  score: null,
  time: null,  
  description: '',
};

export default function game(state = initialState, action) {
  switch (action.type) {
    case 'MENU_DESCRIPTION': {
      return { ...state, description: action.payload };
    }

    default:
      return state;
  }
}
