import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import './index.scss';
import layTableau from '../scripts/layTableau';

class Tableau extends PureComponent {
  render() {
    return this.props.game.cards.tableau.map((item, index) => {
      return (
        <div key={`t-${index}`} className={`tableau tableau-${index}`}>
          {
            item.length > 0 ?
              layTableau(item, index, this.props.game.options.back)
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

export default connect(mapStateToProps)(Tableau);
