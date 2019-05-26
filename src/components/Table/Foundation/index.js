import React from 'react';
import Card from '../../Card';
import makeCard from '../scripts/makeCard';

export default function Foundation(props) {
  return props.foundation.map((item, index) => {
    return (
      <div key={`f-${index}`} className={`foundation foundation-${index}`}>
        {
          item.length > 0 ?
            makeCard({
              ...item[item.length - 1],
              status: 'upturned',
              parent: `foundation-${index}`,
              index: index,
            })
          :
            <Card
              key={`e-${index}`}
              status="empty"
              parent={`foundation-${index}`}
              index=""
            />
        }
      </div>
    );
  });
}
