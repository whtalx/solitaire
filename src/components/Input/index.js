import React from 'react';
import './index.scss';

export default function Input(props) {
  return (
    <div className="input-container">
      <div className={`input-${props.type}${props.checked ? ' checked' : ''}${props.disabled ? ' disabled' : ''}`} />
      <div className={`input-label${props.disabled ? ' disabled' : ''}`}>{props.label}</div>
    </div>
  );
}
