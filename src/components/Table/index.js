import React, { Component } from 'react';
import { connect } from 'react-redux';
import './index.scss';
import Deck from './Deck';
import Waste from './Waste';
import Tableau from './Tableau';
import Foundation from './Foundation';
import handleLeftMouseButton from './scripts/handleLeftMouseButton';
import handleRightMouseButton from './scripts/handleRightMouseButton';

/** TODO: doubleclick fundOne() */
class Table extends Component {
  constructor(props) {
    super(props);
    this.deck = this.props.deck.bind(this);
    this.drop = this.props.drop.bind(this);
    this.turn = this.props.turn.bind(this);
    this.fund = this.props.fund.bind(this);
    this.handleLeftMouseButton = handleLeftMouseButton.bind(this);
    this.handleRightMouseButton = handleRightMouseButton.bind(this);
  }

  componentDidMount() {
    document.addEventListener('mousedown', this.handleLeftMouseButton);
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleLeftMouseButton);
  }

  render() {
    return (
      <div className="table-wrapper">
        <div className="table" onContextMenu={this.handleRightMouseButton}>
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
      if (quantity === 'one') {
        dispatch({ type: 'DRAW_ONE' });
      } else if (quantity === 'three') {
        dispatch({ type: 'DRAW_THREE' });
      }
    },

    drop: (payload) => {
      dispatch({ type: 'DROP', payload });
    },

    turn: (payload) => {
      dispatch({ type: 'TURN', payload });
    },

    fund: () => {
      dispatch({ type: 'FUND' });
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Table);
