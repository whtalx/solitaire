import React from 'react';
import './index.scss';

export default function Input(props) {
  return (
    <div className="input">
      <input
        id={props.id}
        name={props.name}
        type={props.type}
        checked={props.checked}
        disabled={props.disabled}
        onChange={props.change}
        className="input-standard"
      />
      <label htmlFor={props.id} className="input-label">
        <span className="input-icon" />
        <span className="input-text">{props.label}</span>
      </label>
    </div>
  );
}
