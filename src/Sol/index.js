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
        <div className="deck">
          <div className="card ok" />
        </div>
        <div className="waste">
          <div className="card notok" />
        </div>
        <div className="foundation foundation-A">
          <div className="card opened ace hearts" />
        </div>
        <div className="foundation foundation-B">
          <div className="card opened ace clubs" />
        </div>
        <div className="foundation foundation-C">
          <div className="card opened ace diamonds" />
        </div>
        <div className="foundation foundation-D">
          <div className="card opened ace spades" />
        </div>
        <div className="tableau tableau-A">
          <div className="card opened 2 hearts" />
        </div>
        <div className="tableau tableau-B">
          <div className="card closed back-astronaut">
            <div className="card closed back-astronaut" />
          </div>
        </div>
        <div className="tableau tableau-C" />
        <div className="tableau tableau-D">
          <div className="card closed back-astronaut">
            <div className="card closed back-astronaut">
              <div className="card closed back-astronaut">
                <div className="card opened 10 diamonds">
                  <div className="card opened jack spades" />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="tableau tableau-E" />
        <div className="tableau tableau-F" />
        <div className="tableau tableau-G">
        <div className="card opened 9 diamonds">
            <div className="card opened 8 spades">
              <div className="card opened 7 hearts">
                <div className="card opened 6 clubs">
                  <div className="card opened 5 hearts" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="status-bar">
        <div className="status-bar__text">Score: 1234567890!@#$%^&*()_+-=&nbsp;</div>
      </div>
    </div>
  );
}
