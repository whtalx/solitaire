import React, { Component } from 'react';
import './index.scss';
import { connect } from 'react-redux';
import showMenu from './scripts/showMenu';
import hoverMenu from './scripts/hoverMenu';

class Menu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hovered: null,
      isShowing: false,
    };
  }

  render() {
    return (
      <div className="menu-bar">
        <div
          onMouseDown={showMenu.bind(this)}
          onMouseEnter={hoverMenu.bind(this)}
          onMouseLeave={hoverMenu.bind(this)}
          className={`menu-category${this.state.hovered === 'game' ? ' hovered' : ''}${(this.state.isShowing && this.state.hovered === 'game') ? ' showing' : ''}`}
        >
          Game
          <div className="drop-down-menu game">
            <div
              data-func="deal"
              className="menu-item"
              onMouseEnter={() => { this.props.description('Deal a new game')}}
              onMouseLeave={() => { this.props.description('')}}
            >
              <span>Deal</span><span>F2</span>
            </div>
            <hr />
            <div
              data-func="undo"
              className={`menu-item${this.props.cards.history.length === 0 ? ' disabled' : ''}`}
              onMouseEnter={() => { this.props.description('Undo last action')}}
              onMouseLeave={() => { this.props.description('')}}
            >
              Undo
            </div>
            <div
              data-func="back"
              className="menu-item"
              onMouseEnter={() => { this.props.description('Choose new deck back')}}
              onMouseLeave={() => { this.props.description('')}}
            >
              Deck...
            </div>
            <div
              data-func="options"
              className="menu-item"
              onMouseEnter={() => { this.props.description('Change Solitaire options')}}
              onMouseLeave={() => { this.props.description('')}}
            >
              Options...
            </div>
            <hr />
            <div
              data-func="exit"
              className="menu-item"
              onMouseEnter={() => { this.props.description('Exit Solitaire')}}
              onMouseLeave={() => { this.props.description('')}}
            >
              Exit
            </div>
          </div>
        </div>
        <div
          onMouseDown={showMenu.bind(this)}
          onMouseEnter={hoverMenu.bind(this)}
          onMouseLeave={hoverMenu.bind(this)}
          className={`menu-category${this.state.hovered === 'help' ? ' hovered' : ''}${(this.state.isShowing && this.state.hovered === 'help') ? ' showing' : ''}`}
        >
          Help
          <div className="drop-down-menu help">
            <div 
              data-func="help"
              className="menu-item"
              onMouseEnter={() => { this.props.description('Index of Solitaire help topics')}}
              onMouseLeave={() => { this.props.description('')}}
            >
              <span>Contents</span><span>F1</span>
            </div>
            <div
              data-func="help"
              className="menu-item"
              onMouseEnter={() => { this.props.description('Search the Help Engine for a specific topic')}}
              onMouseLeave={() => { this.props.description('')}}
            >
              Search for Help on...
            </div>
            <div
              data-func="help"
              className="menu-item"
              onMouseEnter={() => { this.props.description('Help using help')}}
              onMouseLeave={() => { this.props.description('')}}
            >
              How to Use Help
            </div>
            <hr />
            <div
              data-func="about"
              className="menu-item"
              onMouseEnter={() => { this.props.description('About Solitaire')}}
              onMouseLeave={() => { this.props.description('')}}
            >
              About Solitaire
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    cards: state.cards,
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    deal: () => {
      dispatch({ type: 'DEAL' });
    },

    undo: () => {
      dispatch({ type: 'UNDO' });
    },

    back: () => {
      dispatch({ type: 'SHOW_WINDOW', payload: 'back' });
    },

    options: () => {
      dispatch({ type: 'SHOW_WINDOW', payload: 'options' });
    },

    exit: () => {
      dispatch({ type: 'CLOSE', payload: 'solitaire' });
    },

    help: () => {
      dispatch({ type: 'SHOW_WINDOW', payload: 'help' });
    },

    about: () => {
      dispatch({ type: 'SHOW_WINDOW', payload: 'about' });
    },

    description: (payload) => {
      dispatch({ type: 'MENU_DESCRIPTION', payload });
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Menu);
