import React, { Component } from 'react';
import { connect } from 'react-redux';
import './index.scss';
import moveAndResize from './scripts/moveAndResize';
import resizeCursors from './scripts/resizeCursors';

class Window extends Component {
  constructor(props) {
    super(props);

    if (this.props.window[this.props.name].isResizable) {
      this.handleMouseMove = resizeCursors.bind(this);

      this.handleMouseLeave = () => {
          if (
            this.props.window[this.props.name].cursor
            && !this.props.window[this.props.name].isResizing
          ) {
            this.props.cursor();
          }
        };
  
      this.handleDoubleClick = () => {
        if (this.props.window[this.props.name].isBlocked) { return; }
        if (this.props.window[this.props.name].isMaximized) {
          this.props.restore.bind(this)(this.props.name)
        } else if (!this.props.window[this.props.name].isMinimized) {
          this.props.maximize.bind(this)(this.props.name);
        }
      };
    }
  }

  render() {
    const window = this.props.window[this.props.name];
    const buttons = window.buttons.map((item) => {
      return (
        <div
          key={this.props.name + item}
          className={`window__button window__button_${item}`}
          onMouseDown={
            (event) => {
              if (this.props.name !== 'restart' && !this.props.window[this.props.name].isBlocked) {
                const target = event.target;
                if (event.button === 0) {
                  document.addEventListener('mouseup', (event) => {
                    if (target === event.target) {
                      this.props[item].bind(this)(this.props.name);
                    }
                  }, { once: true });
                }
              }
            }
          }
        />
      );
    });

    let className = `window ${this.props.name}`
      this.props.window.activity.indexOf(this.props.name) === this.props.window.activity.length - 1 ?
        className += ' active'
      :
        className += ' inactive';

    if (this.props.window[this.props.name].isResizable) {
      this.props.window[this.props.name].isMinimized ?
        className += ' minimized'
      :
        this.props.window[this.props.name].isMaximized && (className += ' maximized');
    }

    if (this.props.window[this.props.name].alert) {
      className += ' alert'
      setTimeout(() => {
        this.props.window[this.props.name].alert && this.props.cancelAlert(this.props.name);
      }, 800)
    }

    this.props.window[this.props.name].isBlocked && (className += ' blocked');

    return (
      <div
        className={className}
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
          onDoubleClick={this.handleDoubleClick}
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

    cancelAlert: (payload) => {
      dispatch({ type: 'CANCEL_ALERT', payload });
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Window);
