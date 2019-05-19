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
      <div className="menu">
        <div className="menu-item">Game</div>
        <div className="menu-item">Help</div>
      </div>
      <div className="table">
        <div className="deck card" />
        <div className="waste card" />
        <div className="foundation foundation-1st card" />
        <div className="foundation foundation-2nd card" />
        <div className="foundation foundation-3rd card" />
        <div className="foundation foundation-4th card" />
        <div className="tableau tableau-1st card" />
        <div className="tableau tableau-2nd card" />
        <div className="tableau tableau-3rd card" />
        <div className="tableau tableau-4th card" />
        <div className="tableau tableau-5th card" />
        <div className="tableau tableau-6th card" />
        <div className="tableau tableau-7th card" />
      </div>
      <div className="status-bar">
        <div className="status-bar__text">Score: 1234567890!@#$%^&*()_+-=&nbsp;</div>
      </div>
    </div>
  );
}
