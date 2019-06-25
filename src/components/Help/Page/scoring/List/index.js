import React, { Component } from 'react';
import './index.scss';
import handleMouseEnter from './scripts/handleMouseEnter';
import handleMouseDown from './scripts/handleMouseDown';

const scorings = {
  standard: [
    <p key="paragraph" className="paragraph">The <strong>Standard</strong> option works as follows:</p>,
    <ul key="unordered" className="unordered">
      <li>If you move a card to a suit stack, you get 10 points.</li>
      <li>If you move a card from the deck to a row stack, you get 5 points.</li>
      <li>If you turn over a card in a row stack, you get 5 points.</li>
      <li>If you move a card from a suit stack back to a row stack, you lose 15 points.</li>
      <li>If you are playing with the Draw Three option, you lose 20 points every time you go through the deck after the third time.</li>
      <li>If you are playing with the Draw One option, you lose 100 points every time you go through the deck after the first time.</li>
      <li>For timed games only, you lose 2 points every 10 seconds of play, and you receive bonus points at the end of the game. The shorter the game, the larger the bonus.</li>
    </ul>,
  ],
  vegas: [
    <p key="paragraph" className="paragraph">The <strong>Vegas</strong> option works as follows:</p>,
    <ul key="unordered" className="unordered">
      <li>You start the game with a debt of 52 dollars, which represents your wager.</li>
      <li>You win 5 dollars for every card you play on a suit stack.</li>
      <li>The object of the game is to earn more money than you wagered.</li>
      <li>If you are playing with the Draw Three option, you can only go through the deck three times.</li>
      <li>If you are playing with the Draw One option, you can only go through the deck once.</li>
    </ul>,
  ],
  none: [
    <p key="paragraph" className="paragraph">The <strong>None</strong> option works as follows:</p>,
    <ul key="unordered" className="unordered">
      <li>You start the game with no debt (wager) and no money.</li>
      <li>You can play the game with the timer turned on or off.</li>
      <li>The object of the game is to play all the cards. You don't win or lose any money.</li>
      <li>You can go through the deck as many times as you like whether you are playing with the <strong>Draw Three</strong> option or the <strong>Draw One</strong> option.</li>
    </ul>,
  ],
}

export default class List extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: null,
      showing: {
        standard: false,
        vegas: false,
        none: false,
      },
    };
  }

  componentDidUpdate() {
    this.props.isPageScrollable && this.props.isPageScrollable();
  }

  render() {
    const list = Object.keys(this.state.showing).map((item) => {
      let className = item;
      this.state.showing[item] && (className += ' showing');
      this.state.selected === item && (className += ' selected');

      return (
        <div key={item} className={className}>
          <span className="title" onMouseEnter={handleMouseEnter.bind(this)}>
            {item[0].toUpperCase() + item.slice(1)}
          </span>
          {this.state.showing[item] ? scorings[item] : ''}
        </div>
      );
    });

    return (
      <div className="scoring-list" onMouseDown={handleMouseDown.bind(this)}>
        {list}
      </div>
    );
  }
}