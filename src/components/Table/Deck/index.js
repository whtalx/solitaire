import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import './index.scss';
import makeCard from '../scripts/makeCard';

class Deck extends PureComponent {
  render() {
    const deck = this.props.game.cards.deck.length ?
      this.props.game.cards.deck.map((item, index) => {
        return makeCard({
          ...item,
          parent: 'deck',
          index: index,
          back: this.props.game.options.back,
        });
      })
    :
      this.props.game.status.rollThrough ?
        makeCard({ status: 'ok' })
      :
        makeCard({ status: 'notok' });

    return (
      <div className="deck">
        {deck}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    game: state.game,
  };
}

export default connect(mapStateToProps)(Deck);
