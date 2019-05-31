import React, { Component } from 'react';
import { connect } from 'react-redux';
import './index.scss';
import Deck from './Deck';
import Waste from './Waste';
import Tableau from './Tableau';
import Foundation from './Foundation';
import makeCard from './scripts/makeCard';
import layTableau from './scripts/layTableau';
import handleMouseUp from './scripts/handleMouseUp';
import handleMouseDown from './scripts/handleMouseDown';

class Table extends Component {
  constructor(props) {
    super(props);

    this.deck = this.props.deck.bind(this);
    this.drag = this.props.drag.bind(this);
    this.drop = this.props.drop.bind(this);
    this.turn = this.props.turn.bind(this);
    this.makeCard = makeCard.bind(this);
    this.layTableau = layTableau.bind(this);
    this.handleMouseUp = handleMouseUp.bind(this);
    this.handleMouseDown = handleMouseDown.bind(this);
  }

  componentDidMount() {
    document.addEventListener('mousedown', this.handleMouseDown);
    document.addEventListener('mouseup', this.handleMouseUp);
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleMouseDown);
    document.removeEventListener('mouseup', this.handleMouseUp);
  }

  render() {
    return (
      <div className="table">
        <Deck deck={this.props.cards.deck} back={this.props.cards.back} />
        <Waste waste={this.props.cards.waste} />
        <Foundation foundation={this.props.cards.foundation} />
        <Tableau tableau={this.props.cards.tableau} back={this.props.cards.back} />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    cards: state.cards,
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    deck: () => {
      dispatch({ type: 'DECK' });
    },

    drag: (parent, index) => {
      dispatch({ type: 'DRAG', payload: { parent, index } });
    },

    drop: (parent, index) => {
      dispatch({ type: 'DROP', payload: { parent, index } });
    },

    turn: (parent, index) => {
      dispatch({ type: 'TURN', payload: { parent, index } });
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Table);
