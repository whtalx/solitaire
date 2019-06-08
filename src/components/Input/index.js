import React from 'react';
import './index.scss';

export default function Input(props) {
  return (
    <div className="input-container" onMouseDown={
      (event) => {
        if (!props.click || event.button !== 0) { return; }
        const target = event.target;
        document.addEventListener('mouseup', (event) => {
          event.target === target && props.click();
        }, { once: true });
      }
    }>
      <div className={`input-${props.type}${props.checked ? ' checked' : ''}${props.disabled ? ' disabled' : ''}`} />
      <div className={`input-label${props.disabled ? ' disabled' : ''}`}>{props.label}</div>
    </div>
  );
}
