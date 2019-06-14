import React from 'react';
import './index.scss';

export default function Button(props) {
  let className = 'button';
  props.type === 'ok'
    ? className += ' button_ok'
    : props.type === 'cancel' && (className += ' button_cancel');
  props.selected && (className += ' button_selected');

  return (
    <div className={className} onMouseDown={
      (event) => {
        if (!props.click || event.button !== 0) { return; }
        const target = event.target;
        document.addEventListener('mouseup', (event) => {
          event.target === target && props.click();
        }, { once: true });
      }
    } />
  );
}
