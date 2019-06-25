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
            this.props.window[this.props.name].cursor !== null
            && !this.props.window.isCursorFreezed
          ) {
            this.props.changeCursor({ window: this.props.name, cursor: null });
          }
        };
  
      this.handleDoubleClick = () => {
        if (this.props.window[this.props.name].isBlocked) { return; }
        if (this.props.window[this.props.name].isMaximized) {
          this.props.restore.bind(this)(this.props.name);
        } else if (!this.props.window[this.props.name].isMinimized) {
          this.props.maximize.bind(this)(this.props.name);
        }

        this.props.window.cursor !== null
          && this.props.changeCursor({ window: this.props.name, cursor: null });
      }
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
              if (
                this.props.name === 'solitaire'
                && this.props.game.status.isCelebrating
              ) {
                event.stopPropagation();
                this.props.stopCelebrating();
                return;
              } else if (
                this.props.name !== 'restart'
                && !this.props.window[this.props.name].isBlocked
              ) {
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
    this.props.window.activity[this.props.window.activity.length - 1] === this.props.name
      ? className += ' active'
      : className += ' inactive';

    if (this.props.window[this.props.name].isResizable) {
      this.props.window[this.props.name].isMinimized
        ? className += ' minimized'
        : this.props.window[this.props.name].isMaximized
            && (className += ' maximized');
    }

    if (this.props.window[this.props.name].alert) {
      className += ' alert'
      setTimeout(() => {
        this.props.window[this.props.name].alert
          && this.props.cancelAlert(this.props.name);
      }, 800);
    }

    this.props.window[this.props.name].isBlocked && (className += ' blocked');

    return (
      <div
        className={className}
        onMouseDown={moveAndResize.bind(this)}
        onMouseMove={this.handleMouseMove}
        onMouseLeave={this.handleMouseLeave}
        style={{
          width: Number.isFinite(window.style.width)
            ? `${window.style.width}px`
            : window.style.width,

          height: Number.isFinite(window.style.height)
            ? `${window.style.height}px`
            : window.style.height,

          left: Number.isFinite(window.style.left)
            ? `${window.style.left}px`
            : `calc(50vw - ${window.style.width / 2}px)`,

          top: Number.isFinite(window.style.top)
            ? `${window.style.top}px`
            : `calc(50vh - ${window.style.height / 2}px)`,

          zIndex: this.props.window.activity.indexOf(this.props.name),
        }}
      >
        <div
          className="window__header"
          onDoubleClick={this.handleDoubleClick}
        />
        {
          this.props.name === 'solitaire' || this.props.name === 'help'
            ? <div className="window__icon" />
            : ''
        }
        <div className="window__caption">{window.caption}</div>
        {buttons}
        {this.props.children}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  game: state.game,
  window: state.window,
});

const mapDispatchToProps = (dispatch) => ({
  move: (payload) => dispatch({ type: 'MOVE', payload }),
  resize: (payload) => dispatch({ type: 'RESIZE', payload }),
  minimize: (payload) => dispatch({ type: 'MINIMIZE', payload }),
  maximize: (payload) => dispatch({ type: 'MAXIMIZE', payload }),
  restore: (payload) => dispatch({ type: 'RESTORE', payload }),
  help: () => dispatch({ type: 'SHOW_WINDOW', payload: 'help' }),
  activate: (payload) => dispatch({ type: 'ACTIVATE', payload }),
  freezeCursor: (payload) => dispatch({ type: 'FREEZE_CURSOR', payload }),
  changeCursor: (payload) => dispatch({ type: 'CHANGE_CURSOR', payload }),
  cancelAlert: (payload) => dispatch({ type: 'CANCEL_ALERT', payload }),
  close: (payload) => {
    payload === 'solitaire' && dispatch({ type: 'STOP_GAME' });
    dispatch({ type: 'CLOSE', payload });
  },
  stopCelebrating: () => {
    dispatch({ type: 'STOP_CELEBRATING' });
    dispatch({ type: 'SHOW_WINDOW', payload: 'restart' });
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Window);
