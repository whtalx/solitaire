import React, { Component } from 'react';
import { connect } from 'react-redux';
import Canvas from './Canvas';

class Victory extends Component {
  constructor(props) {
    super(props);
    this.state = { render: false };
    this.quantity = [13, 13, 13, 13];
    this.currentFoundation = 0;
    this.cardWidth = 71;
    this.cardHeight = 96;
    this.canvasWidth = this.props.width;
    this.canvasHeight = this.props.height;
    this.suits = {
      hearts: 0,
      clubs: this.cardWidth,
      diamonds: this.cardWidth * 2,
      spades: this.cardWidth * 3,
    };

    this.throwCards = () => {
      const cx = this.suits[this.props.game.cards.foundation[this.currentFoundation][0].suit];
      const cy = Math.floor((this.quantity[this.currentFoundation] - 1) * this.cardHeight);
      const delta = Math.round(Math.random() * 5 + 4) / 10;

      let hdirection = Math.floor(Math.random() * 2) - 1;
      hdirection = !!hdirection ? hdirection : 1;
      let horizontal = Math.round(hdirection * Math.round(Math.random() * 7 + 1));
      let vertical = Math.round(Math.random() * 6 - 6) - 2;
      let x = this.props.window.solitaire.foundations[this.currentFoundation];
      let y = 6;

      const throwOne = () => {
        x += horizontal;
        y += vertical;

        if (x < -this.cardWidth || x > this.canvasWidth) {
          this.quantity[this.currentFoundation] -= 1;
          this.currentFoundation += 1;
          this.currentFoundation > 3 && (this.currentFoundation = 0);
          if (this.quantity[this.currentFoundation] > 0) {
            this.animation = requestAnimationFrame(this.throwCards);
          } else {
            cancelAnimationFrame(this.animation);
            this.props.stopCelebrating();
          }
          return;
        }

        if (y > this.canvasHeight - this.cardHeight) {
          y = this.canvasHeight - this.cardHeight;
          vertical = -vertical * 0.85;
        }

        vertical += delta;

        this.setState({
          render: {
            cx,
            cy,
            cardWidth: this.cardWidth,
            cardHeight: this.cardHeight,
            x,
            y,
          }
        });
        this.animation = requestAnimationFrame(throwOne);
      }

      this.animation = requestAnimationFrame(throwOne);
    }
  }

  componentDidMount() {
    this.animation = requestAnimationFrame(this.throwCards);
  }

  componentWillUnmount() {
    cancelAnimationFrame(this.animation);
  }

  render() {
    return (
    <Canvas
      width={this.canvasWidth}
      height={this.canvasHeight}
      render={this.state.render}
    />
    );
  }
}

const mapStateToProps = (state) => ({
  game: state.game,
  window: state.window,
});

const mapDispatchToProps = (dispatch) => ({
  stopCelebrating: () => {
    dispatch({ type: 'STOP_CELEBRATING' });
    dispatch({ type: 'SHOW_WINDOW', payload: 'restart' });
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Victory);
