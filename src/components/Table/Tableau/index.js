import React from 'react';
import layTableau from '../scripts/layTableau';

export default function Tableau(props) {
  return props.tableau.map((item, index) => {
    return (
      <div key={`t-${index}`} className={`tableau tableau-${index}`}>
        {
          item.length > 0 ?
            layTableau(item, index, props.back)
          :
            ''
        }
      </div>
    );
  });
}
