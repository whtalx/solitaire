import React, { Component } from 'react';
import './index.scss';
import moveAndResize from './scripts/moveAndResize';
import resizeCursors from './scripts/resizeCursors';
import { connect } from 'react-redux';

class Window extends Component {
  constructor(props) {
    super(props);
    this.props.name === 'solitaire' && (
      this.state = {
        resize: null,
      }
    );
  }

  componentDidMount() {
    this.props.name === 'solitaire' && (
      document.addEventListener('mousemove', resizeCursors.bind(this))
    );
  }

  componentWillUnmount() {
    this.props.name === 'solitaire' && (
      document.removeEventListener('mousemove', resizeCursors.bind(this))
    );
  }

  render() {
    const window = this.props.window[this.props.name];
    const buttons = window.buttons.map((item) => {
      return (
        <div
          key={item}
          className={`window__button window__button_${item}`}
          onMouseDown={
            () => {this.props[item].bind(this)(this.props.name)}
          }
        />
      );
    });

    return (
      <div
        className={`window ${this.props.name}`}
        onMouseDown={moveAndResize.bind(this)}
        style={{
          width:
            Number.isFinite(window.style.width) ?
              `${window.style.width}px`
            :
              window.style.width,
          height:
              Number.isFinite(window.style.height) ?
                `${window.style.height}px`
              :
                window.style.height,
          left:
            Number.isFinite(window.style.left) ?
              `${window.style.left}px`
            :
              `calc(50vw - ${window.style.width / 2}px)`,
          top:
            Number.isFinite(window.style.top) ?
              `${window.style.top}px`
            :
              `calc(50vh - ${window.style.height / 2}px)`,
        }}
      >
        <div
          className="window__header"
          onDoubleClick={
            this.props.name === 'solitaire'
            &&
            (() => this.props.maximize.bind(this)(this.props.name))
          }
        />
        <div className="window__icon" />
        <div className="window__caption">{window.caption}</div>
        {buttons}
        {this.props.children}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    window: state.window,
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    move: (payload) => {
      dispatch({ type: 'MOVE', payload });
    },

    resize: (payload) => {
      dispatch({ type: 'RESIZE', payload });
    },

    minimize: (payload) => {
      dispatch({ type: 'MINIMIZE', payload });
    },

    maximize: (payload) => {
      dispatch({ type: 'MAXIMIZE', payload });
    },

    help: (payload) => {
      dispatch({ type: 'HELP', payload });
    },

    close: (payload) => {
      dispatch({ type: 'CLOSE', payload });
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Window);
