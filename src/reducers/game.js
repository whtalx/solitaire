const initialState = {
  score: 0,
  time: 0,
  rollThrough: true,
  scoring: {
    standard: {
      start: 0,
      wasteToTableau: 5,
      wasteToFoundation: 10,
      tableauToFoundation: 10,
      turn: 5,
      undo: -2,
      foundationToTableau: -15,
      recycleWaste: -100,
      time: -2,
    },
  
    vegas: {
      start: -52,
      wasteToTableau: 0,
      wasteToFoundation: 5,
      tableauToFoundation: 5,
      turn: 0,
      undo: 0,
      foundationToTableau: -5,
      recycleWaste: 0,
      time: 0,
    },
  },
};

export default function game(state = initialState, action) {
  switch (action.type) {

    default:
      return state;
  }
}
