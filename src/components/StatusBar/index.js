import React from 'react';
import { connect } from 'react-redux';
import './index.scss';

function StatusBar(props) {
  return (
    <div className="status-bar">
      <div className="description">{props.window.solitaire.status.description}</div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    window: state.window,
  };
}

export default connect(mapStateToProps)(StatusBar);
