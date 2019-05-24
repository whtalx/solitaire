import React, { Component } from 'react';
import { connect } from 'react-redux';
import Card from '../Card'
import './index.scss';

class Sol extends Component {
  render() {
    console.log(this.props.cards);
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
            {this.props.cards.deck[this.props.cards.deck.length - 1]}
          </div>
          <div className="waste">
            {this.props.cards.waste[this.props.cards.waste.length - 1]}
          </div>
          <div className="foundation foundation-0">
            {
              this.props.cards.foundation[0].length ?
              this.props.cards.foundation[0][this.props.cards.foundation[0].length - 1] :
              <Card status="empty" />
            }
          </div>
          <div className="foundation foundation-1">
            {
              this.props.cards.foundation[1].length ?
              this.props.cards.foundation[1][this.props.cards.foundation[1].length - 1] :
              <Card status="empty" />
            }
          </div>
          <div className="foundation foundation-2">
            {
              this.props.cards.foundation[2].length ?
              this.props.cards.foundation[2][this.props.cards.foundation[2].length - 1] :
              <Card status="empty" />
            }
          </div>
          <div className="foundation foundation-3">
            {
              this.props.cards.foundation[3].length ?
              this.props.cards.foundation[3][this.props.cards.foundation[3].length - 1] :
              <Card status="empty" />
            }
          </div>
          <div className="tableau tableau-0">
            {this.props.cards.tableau[0]}
          </div>
          <div className="tableau tableau-1">
            {this.props.cards.tableau[1]}
          </div>
          <div className="tableau tableau-2">
            {this.props.cards.tableau[2]}
          </div>
          <div className="tableau tableau-3">
            {this.props.cards.tableau[3]}
          </div>
          <div className="tableau tableau-4">
            {this.props.cards.tableau[4]}
          </div>
          <div className="tableau tableau-5">
            {this.props.cards.tableau[5]}
          </div>
          <div className="tableau tableau-6">
            {this.props.cards.tableau[6]}
          </div>
        </div>
        <div className="status-bar">
          <div className="status-bar__text">Score: 1234567890!@#$%^&*()_+-=&nbsp;</div>
        </div>
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
  return;
}

export default connect(mapStateToProps, mapDispatchToProps)(Sol)
