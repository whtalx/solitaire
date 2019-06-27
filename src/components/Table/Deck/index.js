import React from 'react';
import { connect } from 'react-redux';
import './index.scss';
import makeCard from '../scripts/makeCard';

function Deck(props) {
  return (
    <div className="deck">
      {
        !props.game.status.isDeckFetching
          ? props.game.cards.deck.length
            ? props.game.cards.deck.map((item, index) => {
                return makeCard({
                  ...item,
                  parent: 'deck',
                  index: index,
                  back: props.game.options.back,
                });
              })
            : props.game.status.rollThrough
                ? makeCard({ status: 'ok' })
                : makeCard({ status: 'notok' })
          : ''
      }
    </div>
  );
}

const mapStateToProps = (state) => ({
  game: state.game,
});

export default connect(mapStateToProps)(Deck);
