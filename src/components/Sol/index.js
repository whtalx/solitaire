import React from 'react';
import Menu from '../Menu';
import Table from '../Table';
import Window from '../Window';
import StatusBar from '../StatusBar';
import { connect } from 'react-redux';

function Sol(props) {
  return (
    <Window
      caption={props.window.solitaire.caption}
      buttons={props.window.solitaire.buttons}
      width={props.window.solitaire.style.width + 'px'}
      height={props.window.solitaire.style.height + 'px'}
      left={props.window.solitaire.style.left ? `${props.window.solitaire.style.left}px` : `calc(50vw - ${props.window.solitaire.style.width / 2}px)`}
      top={props.window.solitaire.style.top ? `${props.window.solitaire.style.top}px` : `calc(50vh - ${props.window.solitaire.style.height / 2}px)`}
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
      dispatch({ type: 'HELP'});
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Sol);
