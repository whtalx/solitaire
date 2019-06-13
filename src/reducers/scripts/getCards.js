import deckJSON from '../../data/deck.json';

export default function getCards() {
  const cards = {
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

  deckJSON.cards.forEach((item) => {
    cards.deck.push({
      code: item.code,
      value: item.value.toLowerCase(),
      suit: item.suit.toLowerCase(),
      status: 'downturned',
    });
  });
  
  for (let i = 1; i <= 7; i++) {
    for (let j = 1; j <= i; j++) {
      cards.tableau[i - 1].push({
        ...cards.deck.pop(),
        status: j === i ? 'upturned' : 'downturned',
      });
    }
  }

  return cards;
}
