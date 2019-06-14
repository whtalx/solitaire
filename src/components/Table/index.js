import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import './index.scss';
import Deck from './Deck';
import Waste from './Waste';
import Tableau from './Tableau';
import Foundation from './Foundation';
import handleMouseDown from './scripts/handleMouseDown';
import handleDoubleClick from './scripts/handleDoubleClick';

class Table extends PureComponent {
  startTimer() {
    if (this.timer === null) {
      this.props.startTimer();
      this.timer = setInterval(() => {
        this.props.game.options.timed
          && this.props.tick(++this.props.game.status.time);
      }, 1000);
    }
  }

  render() {
    if (
      this.timer !== null
      && (
        !this.props.game.status.isPlaying
        || !this.props.game.options.timed
      )
    ) {
      clearInterval(this.timer);
      this.timer = null;
    }

    return (
      <div className="table-wrapper">
        <div
          className="table"
          onMouseDown={handleMouseDown.bind(this)}
          onContextMenu={() => {
            this.props.window.activity[this.props.window.activity.length - 1] === 'solitaire'
              && this.props.fundAll();
          }}
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
  startTimer: () => dispatch({ type: 'START_TIMER' }),
  tick: (payload) => dispatch({ type: 'TICK', payload }),
});

export default connect(mapStateToProps, mapDispatchToProps)(Table);
