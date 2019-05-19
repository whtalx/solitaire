import React from 'react';
import './index.scss';

export default function App() {
  return (
    <div className="window">
    <div className="window__header" />
    <div className="window__icon" />
    <div className="window__caption">Solitaire</div>
    <div className="window__button window__button_minimize" />
    <div className="window__button window__button_maximize" />
    <div className="window__button window__button_close" />
    </div>
  );
}
