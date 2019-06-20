import React, { Component } from 'react';
import { connect } from 'react-redux';
import Canvas from './Canvas';
import valuesComparison from '../../../data/valuesComparison.json';

class Victory extends Component {
  constructor(props) {
    super(props);
    this.state = { render: false };
    this.currentFoundation = 0;
    this.cardWidth = 71;
    this.cardHeight = 96;
    this.suits = {
      hearts: 0,
      clubs: this.cardWidth,
      diamonds: this.cardWidth * 2,
      spades: this.cardWidth * 3,
    };

    this.throwCards = () => {
      if (this.props.game.cards.foundation[this.currentFoundation].length > 0) {
        const cx = this.suits[this.props.game.cards.foundation[this.currentFoundation][this.props.game.cards.foundation[this.currentFoundation].length - 1].suit];
        const cy = Math.floor((valuesComparison[this.props.game.cards.foundation[this.currentFoundation][this.props.game.cards.foundation[this.currentFoundation].length - 1].value] - 1) * this.cardHeight);
        let delta = Math.round(Math.random() * 5 + 4) / 10;

        let hdirection = Math.floor(Math.random() * 2) - 1;
        hdirection = !!hdirection ? hdirection : 1;
        let horizontal = Math.round(hdirection * Math.round(Math.random() * 7 + 1));
        let vertical = Math.round(Math.random() * 6 - 6) - 2;
        let x = this.props.foundations[this.currentFoundation];
        let y = 6;

        const throwOne = () => {
          x += horizontal;
          y += vertical;

          if (x < -this.cardWidth || x > this.props.width) {
            this.props.shootCard(this.currentFoundation);
            this.currentFoundation += 1;
            this.currentFoundation > 3 && (this.currentFoundation = 0);
            this.animation = requestAnimationFrame(this.throwCards);
            return;
          }

          if (y > this.props.height - this.cardHeight) {
            y = this.props.height - this.cardHeight;
            if (vertical > 0 && vertical <= 2) {
              vertical = -2;
              delta = 0.5;
            } else {
              vertical = -vertical * 0.85;
            }
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

      } else if (this.currentFoundation < 3) {
        this.currentFoundation += 1;
        this.animation = requestAnimationFrame(this.throwCards);
      } else {
        cancelAnimationFrame(this.animation);
        this.props.stopCelebrating();
      }
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
      width={this.props.width}
      height={this.props.height}
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
  shootCard: (payload) => dispatch({ type: 'SHOOT_CARD', payload }),
  stopCelebrating: () => {
    dispatch({ type: 'STOP_CELEBRATING' });
    dispatch({ type: 'SHOW_WINDOW', payload: 'restart' });
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Victory);
