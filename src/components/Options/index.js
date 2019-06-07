import React from 'react';
import './index.scss';
import Button from '../Button';

export default function Options() {
  return (
    <div className="options-contents">
      <Button type="ok" selected />
      <Button type="cancel" />
    </div>
  );
}
