import React from 'react';
import { connect } from 'react-redux';
import './index.scss';

function StatusBar(props) {
  return (
    <div className="status-bar">
      <div className="description">{props.game.description}</div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    game: state.game,
  };
}

export default connect(mapStateToProps)(StatusBar);
