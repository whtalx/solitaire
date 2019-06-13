const scoreFactor = {
  standard: {
    start: 0,
    wasteToTableau: 5,
    wasteToFoundation: 10,
    tableauToFoundation: 10,
    turn: 5,
    undo: -2,
    undoTableauToFoundation: -8,
    undoWasteToFoundation: -10,
    undoFoundationToTableau: 15,
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
    undoTableauToFoundation: -5,
    undoWasteToFoundation: -5,
    undoFoundationToTableau: 5,
    foundationToTableau: -5,
    recycleWaste: 0,
    time: 0,
  },

  none: {
    start: 0,
    wasteToTableau: 0,
    wasteToFoundation: 0,
    tableauToFoundation: 0,
    turn: 0,
    undo: 0,
    undoTableauToFoundation: 0,
    undoWasteToFoundation: 0,
    undoFoundationToTableau: 0,
    foundationToTableau: 0,
    recycleWaste: 0,
    time: 0,
  },
};

export default scoreFactor;
