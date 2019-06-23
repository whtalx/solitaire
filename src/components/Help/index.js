import React, { Component } from 'react';
import { connect } from 'react-redux';
import './index.scss';
import hideContents from './scripts/hideContents';
import moveSeparator from './scripts/moveSeparator';
import Contents from './Contents';
import Page from './Page';

class Help extends Component {
  constructor() {
    super();
    this.state = {
      isShowingContents: true,
      shift: 0,
      isContentsOpened: false,
      selected: 'book',
      history: [],
      historyIndex: null,
    };

    this.contentsWidth = 267;

    this.select = (item) => {
      if (
        this.state.history[this.state.history.length - 1] === item
      ) {
        return;
      }

      this.setState((state) => {
        state.selected = item;
        if (item === 'book') {
          state.isContentsOpened = !state.isContentsOpened;
        } else {
          state.historyIndex !== state.history.length - 1
            && state.history.splice(state.historyIndex + 1);
          state.history.push(item);
          state.historyIndex = state.history.length - 1;
        }
        return state;
      });
    }

    this.back = () => {
      if (
        this.state.history.length === 0
        || this.state.historyIndex === 0
      ) {
        return;
      }

      this.setState((state) => {
        state.historyIndex -= 1;
        return state;
      });
    }

    this.forward = () => {
      if (
        this.state.history.length === 0
        || this.state.historyIndex === this.state.history.length - 1
      ) {
        return;
      }

      this.setState((state) => {
        state.historyIndex += 1;
        return state;
      });
    }
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

    let backClassName = 'back';
    if (
      this.state.history.length === 0
      || this.state.historyIndex === 0
    ) {
      backClassName += ' inactive';
    }

    let forwardClassName = 'forward';
    if (
      this.state.history.length === 0
      || this.state.historyIndex === this.state.history.length - 1
    ) {
      forwardClassName += ' inactive';
    }

    return (
      <div className="help-contetns" ref="container">
        <div className="buttons">
          <div className={hideButtonClassName} onMouseDown={hideContents.bind(this)}>
            {hideButtonClassName.charAt(0).toUpperCase() + hideButtonClassName.slice(1)}
          </div>
          <div
            className={backClassName}
            onMouseDown={(event) => {
              const target = event.target;
              document.addEventListener('mouseup',(event) => {
                if (event.target === target) {
                  this.back();
                }
              },{ once: true });
            }}
          >
            Back
          </div>
          <div
            className={forwardClassName}
            onMouseDown={(event) => {
              const target = event.target;
              document.addEventListener('mouseup',(event) => {
                if (event.target === target) {
                  this.forward();
                }
              },{ once: true });
            }}
          >
            Forward
          </div>
        </div>
        {
          this.state.isShowingContents
            ? <div className="contents-container" ref="contents" style={contentsStyle}>
                <div className="tab">
                  <div className="contents-wrapper">
                    <Contents
                      isOpened={this.state.isContentsOpened}
                      selected={this.state.selected}
                      select={this.select}
                    />
                  </div>
                </div>
              </div>
            : ''
        }
        {
          this.state.isShowingContents
          ? <div className="separator" onMouseDown={moveSeparator.bind(this)} />
          : ''
        }
        <div className="page-container" ref="page" style={pageStyle}>
          <Page
            history={this.state.history}
            index={this.state.historyIndex}
            selected={
              this.state.history.length > 0
                ? this.state.history[this.state.historyIndex]
                : 'overview'
            }
          />
        </div>
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
