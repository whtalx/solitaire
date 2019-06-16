import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import './index.scss';
import Deck from './Deck';
import Waste from './Waste';
import Tableau from './Tableau';
import Foundation from './Foundation';
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

      return (
        <div className="table-wrapper">
          <div
            className="celebrating"
            onMouseDown={() => {
              this.props.game.status.isCelebrating
                && this.props.stopCelebrating()
            }}
          />
        </div>
      );
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
  startCelebrating: () => dispatch({ type: 'START_CELEBRATING' }),
  stopCelebrating: () => {
    dispatch({ type: 'STOP_CELEBRATING' });
    dispatch({ type: 'SHOW_WINDOW', payload: 'restart' });
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Table);
