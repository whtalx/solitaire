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
  constructor(props) {
    super(props);
    this.foundations = [];
    this.foundationsOffsets = [257, 339, 421, 503];
  }

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

  foundationsRef(ref, index) {
    this.foundations[index] = ref;
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
        <div className="table-wrapper" ref="table">
          {
            this.props.game.status.isCelebrating
              ? this.refs.table
                  ? <Victory
                      width={this.refs.table.clientWidth}
                      height={this.refs.table.clientHeight}
                      foundations={this.foundationsOffsets}
                    />
                  : ''
              : ''
          }
        </div>
      );
    }

    this.foundations.forEach((item, index) => {
      if (
        item.offsetLeft
        && this.foundationsOffsets[index] !== item.offsetLeft
      ) {
        this.foundationsOffsets[index] = item.offsetLeft;
      }
    });

    return (
      <div className="table-wrapper" ref="table">
        <div
          className="table"
          onMouseDown={handleMouseDown.bind(this)}
          onDoubleClick={handleDoubleClick.bind(this)}
        >
          <Deck />
          <Waste />
          <Foundation refs={this.foundationsRef.bind(this)} />
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
});

export default connect(mapStateToProps, mapDispatchToProps)(Table);
