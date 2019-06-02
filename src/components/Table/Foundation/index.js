import React from 'react';
import makeCard from '../scripts/makeCard';

export default function Foundation(props) {
  return props.foundation.map((item, index) => {
    return (
      <div key={`f-${index}`} className={`foundation foundation-${index}`}>
        {
          item.length > 0 ?
            item.map((enclosedItem, enclosedIndex) => makeCard({
              ...enclosedItem,
              status: 'upturned',
              parent: `foundation-${index}`,
              index: enclosedIndex,
            }))
          :
            ''
        }
      </div>
    );
  });
}
