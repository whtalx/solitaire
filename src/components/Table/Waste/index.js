import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import './index.scss';
import makeCard from '../scripts/makeCard';

class Waste extends PureComponent {
  render() {
    const waste = this.props.game.cards.waste.map((item, index) => {
      return makeCard({
        ...item,
        parent: 'waste',
        index: index,
      });
    })
    return(
      <div className={`waste by-${this.props.game.options.draw}`}>
        {waste}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    game: state.game,
  };
}

export default connect(mapStateToProps)(Waste);

