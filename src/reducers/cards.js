import deckJSON from '../data/deck.json';

export default function cards(state = {}, action) {
  if (action.type === '@@INIT') {
    const newState = {
      deck: [],
      waste: [],
      foundation: [
        [],
        [],
        [],
        [],
      ],
      tableau: [
        [],
        [],
        [],
        [],
        [],
        [],
        [],
      ],
      back: Math.round(Math.random() * 11),
    };

    deckJSON.cards.forEach((item) => {
      newState.deck.push({
        code: item.code,
        value: item.value.toLowerCase(),
        suit: item.suit.toLowerCase(),
      });
    });

    for (let i = 1; i <= 7; i++) {
      for (let j = 1; j <= i; j++) {
        newState.tableau[i - 1].push(newState.deck.pop());
      }
    }

    return newState;
  }

  return state;
}
