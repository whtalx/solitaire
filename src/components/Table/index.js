import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import './index.scss';
import Deck from './Deck';
import Waste from './Waste';
import Tableau from './Tableau';
import Foundation from './Foundation';
import Victory from './Victory';
import handleMouseDown from './scripts/handleMouseDown';
import handleDoubleClick from './scripts/handleDoubleClick';
import worker from './scripts/worker';

class Table extends PureComponent {
  startTimer() {
    this.timer = new Worker(worker);
    this.timer.onmessage = (message) => {
      this.props.tick(message.data);
    }
  }

  stopTimer() {
    this.timer.terminate();
    this.timer = undefined;
  }

  startGame() {
    this.props.startGame();
    if (this.props.game.options.timed && this.timer === undefined) {
      this.startTimer();
    }
  }

  render() {
    if (
      (
        !this.props.game.status.isPlaying
        || !this.props.game.options.timed
      )
      && this.timer !== undefined
    ) {
      this.stopTimer();
    }

    if (this.props.game.status.cardsInFoundation === 52) {
      if (
        !this.props.game.status.isCelebrating
        && this.props.game.status.isPlaying
      ) {
        this.props.startCelebrating();
      }

      const table = document.getElementsByClassName('table-wrapper')[0];

      return (
        <div className="table-wrapper">
          {
            this.props.game.status.isCelebrating
              ? <Victory width={table.clientWidth} height={table.clientHeight} />
              : ''
          }
        </div>
      );
    }

    const table = document.getElementsByClassName('table-wrapper')[0];
    if (table) {
      const foundations = [];
      const gap = table.clientWidth > 585
        ? (table.clientWidth - 585) / 8
        : 0;
  
      for (let i = 3; i < 7; i++) {
        foundations.push(Math.round(11 + 82 * i + gap * (i + 1)));
      }
  
      foundations[0] !== this.props.window.solitaire.foundations[0]
        && this.props.foundationsMoved(foundations);
    }

    return (
      <div className="table-wrapper">
        <div
          className="table"
          onMouseDown={handleMouseDown.bind(this)}
          onDoubleClick={handleDoubleClick.bind(this)}
        >
          <Deck />
          <Waste />
          <Foundation />
          <Tableau />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  game: state.game,
  window: state.window,
});

const mapDispatchToProps = (dispatch) => ({
  draw: (payload) => dispatch({ type: 'DRAW', payload }),
  drop: (payload) => dispatch({ type: 'DROP', payload }),
  turn: (payload) => dispatch({ type: 'TURN', payload }),
  fundOne: (payload) => dispatch({ type: 'FUND_ONE', payload }),
  fundAll: () => dispatch({ type: 'FUND_ALL' }),
  activate: () => dispatch({ type: 'ACTIVATE', payload: 'solitaire' }),
  startGame: () => dispatch({ type: 'START_GAME' }),
  tick: (payload) => dispatch({ type: 'TICK', payload }),
  foundationsMoved: (payload) => dispatch({ type: 'FOUNDATIONS_MOVED', payload }),
  startCelebrating: () => dispatch({ type: 'START_CELEBRATING' }),
});

export default connect(mapStateToProps, mapDispatchToProps)(Table);
