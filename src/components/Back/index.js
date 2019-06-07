import React from 'react';
import './index.scss';
import Button from '../Button';

export default function Back() {
  return (
    <div className="back-contents">
      <Button type="ok" selected />
      <Button type="cancel" />
    </div>
  );
}
