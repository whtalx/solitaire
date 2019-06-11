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
  render() {
    return (
      <div className="table-wrapper">
        <div
          className="table"
          onMouseDown={handleMouseDown.bind(this)}
          onContextMenu={this.props.fundAll.bind(this)}
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

const mapStateToProps = (state) => {
  return {
    cards: state.cards,
    options: state.options,
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    draw: (payload) => {
      dispatch({ type: 'DRAW', payload });
    },

    drop: (payload) => {
      dispatch({ type: 'DROP', payload });
    },

    turn: (payload) => {
      dispatch({ type: 'TURN', payload });
    },

    fundOne: (payload) => {
      dispatch({ type: 'FUND_ONE', payload });
    },

    fundAll: () => {
      dispatch({ type: 'FUND_ALL' });
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Table);
