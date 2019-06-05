import React from 'react';
import Menu from '../Menu';
import Table from '../Table';
import Window from '../Window';
import StatusBar from '../StatusBar';
import { connect } from 'react-redux';

function Sol(props) {
  return (
    <Window
      name="solitaire"
      children={[
        <Menu key="menu" />,
        <Table key="table" />,
        <StatusBar key="statusBar" />,
      ]}
    />
  );
}

const mapStateToProps = (state) => {
  return {
    window: state.window,
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    deck: () => {
      dispatch({ type: 'DECK' });
    },

    options: () => {
      dispatch({ type: 'OPTIONS' });
    },

    undo: () => {
      dispatch({ type: 'UNDO' });
    },

    help: () => {
      dispatch({ type: 'HELP' });
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Sol);
