import React from 'react';
import Card from '../../Card';

export default function makeCard(card) {
  return (
    <Card
      key={card.code}
      back={card.back}
      value={card.value}
      suit={card.suit}
      status={card.status}
      children={card.children}
      parent={card.parent}
      index={card.index}
      left={card.left}
      top={card.top}
      draw={card.draw}
    />
  );
}
