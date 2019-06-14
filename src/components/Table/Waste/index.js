import React from 'react';
import { connect } from 'react-redux';
import './index.scss';
import makeCard from '../scripts/makeCard';

function Waste(props) {
  return(
    <div className={`waste by-${props.game.options.draw}`}>
      {
        props.game.cards.waste.map((item, index) => {
          return makeCard({
            ...item,
            parent: 'waste',
            index: index,
          });
        })
      }
    </div>
  );
}

const mapStateToProps = (state) => ({
  game: state.game,
});

export default connect(mapStateToProps)(Waste);

