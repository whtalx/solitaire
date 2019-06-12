import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import './index.scss';
import makeCard from '../scripts/makeCard';

class Foundation extends PureComponent {
  render() {
    return this.props.game.cards.foundation.map((item, index) => {
      return (
        <div key={`f-${index}`} className={`foundation foundation-${index}`}>
          {
            item.length > 0 ?
              item.map((enclosedItem, enclosedIndex) => makeCard({
                ...enclosedItem,
                status: 'upturned',
                parent: `foundation-${index}`,
                index: enclosedIndex,
              }))
            :
              ''
          }
        </div>
      );
    });
  }
}

const mapStateToProps = (state) => {
  return {
    game: state.game,
  };
}

export default connect(mapStateToProps)(Foundation);
