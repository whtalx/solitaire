import React, { Component } from 'react';
import './index.scss';
import moveWindow from './scripts/moveWindow';
import { connect } from 'react-redux';

class Window extends Component {
  render() {
    const buttons = this.props.buttons.map((item) => {
      return (
        <div
          key={item}
          className={`window__button window__button_${item}`}
        />
      );
    });

    return (
      <div
        className="window"
        style={{
          width: this.props.width,
          height: this.props.height,
          left: this.props.left,
          top: this.props.top,
        }}
      >
        <div
          className="window__header"
          onMouseDown={moveWindow.bind(this)}
        />
        <div
          className="window__icon"
          onMouseDown={moveWindow.bind(this)}
        />
        <div
          className="window__caption"
          onMouseDown={moveWindow.bind(this)}
        >
          {this.props.caption}
        </div>
        {buttons}
        {this.props.children}
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    move: (payload) => {
      dispatch({ type: 'MOVE', payload });
    },

    minimize: () => {
      dispatch({ type: 'MINIMIZE'});
    },

    maximize: () => {
      dispatch({ type: 'MAXIMIZE'});
    },

    help: () => {
      dispatch({ type: 'HELP'});
    },

    close: () => {
      dispatch({ type: 'CLOSE'});
    },
  };
}

export default connect(null, mapDispatchToProps)(Window);
