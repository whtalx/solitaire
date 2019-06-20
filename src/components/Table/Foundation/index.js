import React from 'react';
import { connect } from 'react-redux';
import './index.scss';
import makeCard from '../scripts/makeCard';

function Foundation(props) {
  return props.game.cards.foundation.map((item, index) => {
    return (
      <div
        key={`f-${index}`}
        className={`foundation foundation-${index}`}
        ref={node => props.refs(node, index)}
      >
        {
          item.length > 0
            ? item.map((enclosedItem, enclosedIndex) => makeCard({
                ...enclosedItem,
                status: 'upturned',
                parent: `foundation-${index}`,
                index: enclosedIndex,
              }))
            : ''
        }
      </div>
    );
  });
}

const mapStateToProps = (state) => ({
  game: state.game,
});

export default connect(mapStateToProps)(Foundation);
