import React from 'react';

export default function Card(props) {
  const status =  {
    ok: 'ok',
    notok: 'notok',
    empty: 'empty',
    downturned: `closed ${props.back ? props.back : 'back-island'}`,
    upturned: `opened ${props.value} ${props.suit}`
  };
  return (
    <div className={`card ${status[props.status]}`}>
      {props.children}
    </div>
  );
}
