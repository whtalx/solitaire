import React from 'react';
import makeCard from '../scripts/makeCard';

export default function Deck(props) {
  return (
    <div className="deck">
      {
        props.deck.length > 0 ?
          props.deck.map((item, index) => {
            return makeCard({
              ...item,
              status: 'downturned',
              parent: 'deck',
              index: index,
              back: props.back,
            });
          })
        :
          makeCard({ status: 'ok' })
      }
    </div>
  );
}
