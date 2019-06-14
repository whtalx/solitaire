import React from 'react';
import { connect } from 'react-redux';
import './index.scss';
import layTableau from '../scripts/layTableau';

function Tableau(props) {
  return props.game.cards.tableau.map((item, index) => {
    return (
      <div key={`t-${index}`} className={`tableau tableau-${index}`}>
        {
          item.length > 0
            ? layTableau(item, index, props.game.options.back)
            : ''
        }
      </div>
    );
  });
}

const mapStateToProps = (state) => ({
  game: state.game,
});

export default connect(mapStateToProps)(Tableau);
