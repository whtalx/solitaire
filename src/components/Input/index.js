import React from 'react';
import './index.scss';

export default function Input(props) {
  let labelClassName = 'input-label';
  let iconClassName = `input-${props.type}`;
  props.checked && (iconClassName += ' checked');

  if (props.disabled) {
    iconClassName += ' disabled';
    labelClassName += ' disabled';
  }

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
      <div className={iconClassName} />
      <div className={labelClassName}>{props.label}</div>
    </div>
  );
}
