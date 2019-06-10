import React, { Component } from 'react';
import { connect } from 'react-redux';
import './index.scss';
import moveAndResize from './scripts/moveAndResize';
import resizeCursors from './scripts/resizeCursors';

class Window extends Component {
  constructor(props) {
    super(props);

    this.handleMouseMove = this.props.name === 'solitaire' ? 
      resizeCursors.bind(this)
    :
      null;

    this.handleMouseLeave = this.props.name === 'solitaire' ? 
      () => {
        (this.props.window.solitaire.cursor && !this.props.window.solitaire.isResizing) && this.props.cursor()
      }
    :
      null;
  }

  render() {
    const window = this.props.window[this.props.name];
    const buttons = window.buttons.map((item) => {
      return (
        <div
          key={item}
          className={`window__button window__button_${item}`}
          onMouseDown={
            (event) => {
              const target = event.target;
              event.button === 0 && document.addEventListener('mouseup', (event) => {
                target === event.target && this.props[item].bind(this)(this.props.name)
              }, { once: true });
            }
          }
        />
      );
    });

    return (
      <div
        className={`window ${this.props.name} ${(this.props.window.activity.indexOf(this.props.name) === this.props.window.activity.length - 1) ? 'active' : 'inactive'}${(this.props.name === 'solitaire' && this.props.window.solitaire.isMinimized) ? ' minimized' : ''}${(this.props.name === 'solitaire' && this.props.window.solitaire.isMaximized) ? ' maximized' : ''}`}
        onMouseDown={moveAndResize.bind(this)}
        onMouseMove={this.handleMouseMove}
        onMouseLeave={this.handleMouseLeave}
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
          zIndex: this.props.window.activity.indexOf(this.props.name),
        }}
      >
        <div
          className="window__header"
          onDoubleClick={
            this.props.name === 'solitaire' ?
              (() => {
                this.props.window.solitaire.isMaximized ?
                  this.props.restore.bind(this)()
                :
                  !this.props.window.solitaire.isMinimized && this.props.maximize.bind(this)();
              })
            :
              () => {}
          }
        />
        {
          this.props.name === 'solitaire' ?
            <div className="window__icon" />
          :
            ''
        }
        
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

    startResizing: () => {
      dispatch({ type: 'START_RESIZING' });
    },

    resize: (payload) => {
      dispatch({ type: 'RESIZE', payload });
    },

    endResizing: () => {
      dispatch({ type: 'END_RESIZING' });
    },

    minimize: (payload) => {
      dispatch({ type: 'MINIMIZE', payload });
    },

    maximize: () => {
      dispatch({ type: 'MAXIMIZE' });
    },

    restore: () => {
      dispatch({ type: 'RESTORE' });
    },

    help: () => {
      dispatch({ type: 'SHOW_WINDOW', payload: 'help' });
    },

    close: (payload) => {
      dispatch({ type: 'CLOSE', payload });
    },

    activate: (payload) => {
      dispatch({ type: 'ACTIVATE', payload });
    },

    cursor: (payload) => {
      dispatch({ type: 'CURSOR', payload });
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Window);
