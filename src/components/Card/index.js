import React from 'react';
import './index.scss';

export default function Card(props) {
  const draw = {
    2: 'center',
    3: 'door'
  }

  const status =  {
    ok: 'ok',
    notok: 'not-ok',
    empty: 'empty',
    downturned: `closed back-${props.back}`,
    upturned: `opened ${props.value} ${props.suit}`,
  };

  draw[props.draw] && (status.upturned += ` ${draw[props.draw]}`);

  return (
    <div
      data-parent={props.parent}
      data-index={props.index}
      className={`card ${status[props.status]}`}
    >
      {props.children}
    </div>
  );
}
