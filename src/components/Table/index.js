import React, { Component } from 'react';
import { connect } from 'react-redux';
import makeCard from './scripts/makeCard';
import layTableau from './scripts/layTableau';
import handleMouseDown from './scripts/handleMouseDown';
import handleMouseUp from './scripts/handleMouseUp';
import Deck from './Deck';
import Waste from './Waste';
import Foundation from './Foundation'
import Tableau from './Tableau';
import './index.scss';

class Table extends Component {
  constructor(props) {
    super(props);

    this.drag = this.props.drag.bind(this);
    this.drop = this.props.drop.bind(this);
    this.deckToWaste = this.props.deckToWaste.bind(this);
    this.makeCard = makeCard.bind(this);
    this.layTableau = layTableau.bind(this);
    this.handleMouseDown = handleMouseDown.bind(this);
    this.handleMouseUp = handleMouseUp.bind(this);
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
    deckToWaste: () => {
      dispatch({ type: 'DECK_TO_WASTE' });
    },

    drag: (parent, index) => {
      dispatch({ type: 'DRAG', payload: { parent, index } });
    },

    drop: (parent, index) => {
      dispatch({ type: 'DROP', payload: { parent, index } });
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Table);
