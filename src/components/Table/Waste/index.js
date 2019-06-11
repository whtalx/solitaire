import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import './index.scss';
import makeCard from '../scripts/makeCard';

class Waste extends PureComponent {
  render() {
    const waste = this.props.cards.waste.map((item, index) => {
      return makeCard({
        ...item,
        parent: 'waste',
        index: index,
      });
    })
    return(
      <div className={`waste by-${this.props.options.draw}`}>
        {waste}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    cards: state.cards,
    options: state.options,
  };
}

export default connect(mapStateToProps)(Waste);

