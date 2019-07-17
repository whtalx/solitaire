import React from 'react';
import './index.scss';

export default function Button(props) {
  let className = 'button';
  props.type === 'ok'
    ? className += ' button_ok'
    : props.type === 'cancel' && (className += ' button_cancel');

  return (
    <button
      className={className}
      onKeyDown={
        (event) => {
          (event.which === 32 || event.which === 13) && props.click();
        }
      }
      onMouseDown={
        (event) => {
          if (!props.click || event.button !== 0) { return; }
          const target = event.target;
          document.addEventListener('mouseup', (event) => {
            event.target === target && props.click();
          }, { once: true });
        }
      }
    />
  );
}
