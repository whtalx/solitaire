import React from 'react';
import './index.scss';

const cardMouseDown = (event) => {
  if (!event.target.classList.contains('opened')) { return false; }
  event.stopPropagation();
  const card = event.target;
  const shiftX = event.pageX;
  const shiftY = event.pageY;

  card.style.zIndex = 69;
  card.addEventListener('mouseup', drop, { once: true });
  document.addEventListener('mousemove', drag);

  function drag(event) {
    card.style.left = event.pageX - shiftX + 'px';
    card.style.top = event.pageY - shiftY + 'px';
  }

  function drop(event) {
    card.style.left = '';
    card.style.top = '';
    card.style.zIndex = '';
    document.removeEventListener('mousemove', drag);
    const mouseUp = new window.Event('mouseup', { bubbles: true });
    document.elementFromPoint(event.clientX, event.clientY).dispatchEvent(mouseUp);
  }
}

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
      onMouseDown={cardMouseDown}
    >
      {props.children}
    </div>
  );
}
