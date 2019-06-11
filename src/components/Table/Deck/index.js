import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import './index.scss';
import makeCard from '../scripts/makeCard';

class Deck extends PureComponent {
  render() {
    const deck = this.props.cards.deck.length ?
      this.props.cards.deck.map((item, index) => {
        return makeCard({
          ...item,
          parent: 'deck',
          index: index,
          back: this.props.cards.back,
        });
      })
    :
    makeCard({ status: 'ok' });

    return (
      <div className="deck">
        {deck}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    cards: state.cards,
  };
}

export default connect(mapStateToProps)(Deck);
