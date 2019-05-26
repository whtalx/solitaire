import React from 'react';
import Card from '../../Card';

export default function makeCard({ code, back, value, suit, status, children, parent, index }) {
  return (
    <Card
      key={code}
      back={back}
      value={value}
      suit={suit}
      status={status}
      children={children}
      parent={parent}
      index={index}
    />
  );
}
