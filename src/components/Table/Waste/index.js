import React from 'react';
import makeCard from '../scripts/makeCard';

export default function Waste(props) {
  return(
    <div className="waste">
    {
      props.waste.map((item, index) => {
        return makeCard({
          ...item,
          status: 'upturned',
          parent: 'waste',
          index: index,
        });
      })
    }
    </div>
  );
}
