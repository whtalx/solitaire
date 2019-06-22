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
    };

    this.contentsWidth = 267;

    this.select = (item) => {
      item === 'book'
        && this.setState(state => {
          state.isContentsOpened = !state.isContentsOpened;
        });

      this.setState({ selected: item });
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
          <Page selected={this.state.selected} />
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
