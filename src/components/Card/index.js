import React from 'react';
import './index.scss';

export default function Card(props) {
  const status =  {
    ok: 'ok',
    notok: 'notok',
    empty: 'empty',
    downturned: `closed back-${props.back}`,
    upturned: `opened ${props.value} ${props.suit}`
  };
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