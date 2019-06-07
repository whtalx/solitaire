import React from 'react';
import './index.scss';

export default function Button(props) {
  let className = 'button';
  props.type === 'ok' ?
    (className += ' button_ok')
  :
    props.type === 'cancel' && (className += ' button_cancel');
  props.selected && (className += ' button_selected');
  return (
    <div className={className} />
  );
}
