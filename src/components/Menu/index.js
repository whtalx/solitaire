import React from 'react';
import './index.scss';

export default function Menu() {
  return (
    <div className="menu-bar">
      <div className="menu-category">Game
        <div className="drop-down-menu">
          <div className="menu-item">Deal&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;F2</div>
          <hr />
          <div className="menu-item">Undo</div>
          <div className="menu-item">Deck...</div>
          <div className="menu-item">Options...</div>
          <hr />
          <div className="menu-item">Exit</div>
        </div>
      </div>
      <div className="menu-category">Help
        <div className="drop-down-menu">
          <div className="menu-item">Contents&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;F1</div>
          <div className="menu-item">Search for Help on...</div>
          <div className="menu-item">How to Use Help</div>
          <hr />
          <div className="menu-item">About Solitaire</div>
        </div>
      </div>
    </div>
  );
}
