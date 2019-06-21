import React, { Component } from 'react';
import { connect } from 'react-redux';
import './index.scss';
import hideContents from './scripts/hideContents';
import moveSeparator from './scripts/moveSeparator';

class Help extends Component {
  constructor() {
    super();
    this.state = {
      isShowingContents: true,
      shift: 0,
    };

    this.contentsWidth = 267;
  }

  render() {
    if (
      this.refs.page
      && this.refs.page.offsetWidth !== this.pageWidth
    ) {
      this.pageWidth = this.refs.page.offsetWidth;
    }

    const hideButtonClassName = this.state.isShowingContents
      ? 'hide'
      : 'show';

    const contentsStyle = {
      width: `${this.contentsWidth + this.state.shift}px`,
      minWidth: `${this.contentsWidth + this.state.shift}px`,
    };

    const pageStyle = {
      width: this.state.isShowingContents
        ? `calc(100% - ${this.contentsWidth + 4 + this.state.shift}px)`
        : '100%',
    };

    return (
      <div className="help-contetns" ref="container">
        <div className="buttons">
          <div className={hideButtonClassName} onMouseDown={hideContents.bind(this)}>
            {hideButtonClassName.charAt(0).toUpperCase() + hideButtonClassName.slice(1)}
          </div>
          <div className="back inactive">Back</div>
          <div className="forward inactive">Forward</div>
        </div>
        {
          this.state.isShowingContents
            ? <div className="contents" ref="contents" style={contentsStyle}>
                <div className="tab">
                  <div className="list-wrapper"></div>
                </div>
              </div>
            : ''
        }
        {
          this.state.isShowingContents
          ? <div className="separator" onMouseDown={moveSeparator.bind(this)} />
          : ''
        }
        <div className="page" ref="page" style={pageStyle}></div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  window: state.window,
});

const mapDispatchToProps = (dispatch) => ({
  move: (payload) => dispatch({ type: 'MOVE', payload }),
  resize: (payload) => dispatch({ type: 'RESIZE', payload }),
  changeCursor: (payload) => dispatch({ type: 'CHANGE_CURSOR', payload }),  
  freezeCursor: (payload) => dispatch({ type: 'FREEZE_CURSOR', payload }),
});

export default connect(mapStateToProps, mapDispatchToProps)(Help);
