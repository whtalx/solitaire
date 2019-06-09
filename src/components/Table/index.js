import React, { Component } from 'react';
import { connect } from 'react-redux';
import './index.scss';
import Deck from './Deck';
import Waste from './Waste';
import Tableau from './Tableau';
import Foundation from './Foundation';
import handleMouseDown from './scripts/handleMouseDown';
import handleDoubleClick from './scripts/handleDoubleClick';

class Table extends Component {
  constructor(props) {
    super(props);
    this.deck = this.props.deck.bind(this);
    this.drop = this.props.drop.bind(this);
    this.turn = this.props.turn.bind(this);
    this.fundOne = this.props.fundOne.bind(this);
    this.fundAll = this.props.fundAll.bind(this);
    this.handleMouseDown = handleMouseDown.bind(this);
    this.handleDoubleClick = handleDoubleClick.bind(this);
  }

  render() {
    return (
      <div className="table-wrapper">
        <div
          className="table"
          onMouseDown={this.handleMouseDown}
          onContextMenu={() => { this.fundAll() }}
          onDoubleClick={this.handleDoubleClick}
        >
          <Deck deck={this.props.cards.deck} back={this.props.options.back} />
          <Waste waste={this.props.cards.waste} quantity={this.props.options.draw} />
          <Foundation foundation={this.props.cards.foundation} />
          <Tableau tableau={this.props.cards.tableau} back={this.props.options.back} />
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
    deck: (quantity) => {
      quantity === 'one' && dispatch({ type: 'DRAW_ONE' });
      quantity === 'three' && dispatch({ type: 'DRAW_THREE' });
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
