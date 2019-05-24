import React from 'react';
import Card from '../components/Card'
import deckJSON from '../data/deck.json'

export default function cards(state = {}, action) {
  if (action.type === '@@INIT') {
    const newState = {
      cards: [],
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
    };

    const layTableau = (arr) => {
      return (
        <Card
          key={arr[0].code}
          value={arr[0].value}
          suit={arr[0].suit}
          status={arr.length > 1 ? 'downturned' : 'upturned'}
          children={arr.length > 1 && layTableau(arr.slice(1, arr.length))}
        />
      );
    }

    const layDeck = (card) => {
      return (
        <Card
          key={card.code}
          value={card.value}
          suit={card.suit}
          status="downturned"
        />
      );
    }

    deckJSON.cards.forEach((item) => {
      newState.cards.push({
        code: item.code,
        value: item.value.toLowerCase(),
        suit: item.suit.toLowerCase(),
      });
    });

    for (let i = 1; i <= 7; i++) {
      newState.tableau[i - 1].push(layTableau(newState.cards.splice(0, i)));
    }

    newState.deck = newState.cards.map(item => layDeck(item));

    return newState;
  }

  return state;
}
