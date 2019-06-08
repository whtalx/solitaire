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
          <div className="drop-down-menu">
            <div data-func="deal" className="menu-item">Deal&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;F2</div>
            <hr />
            <div data-func="undo" className="menu-item">Undo</div>
            <div data-func="back" className="menu-item">Deck...</div>
            <div data-func="options" className="menu-item">Options...</div>
            <hr />
            <div data-func="exit" className="menu-item">Exit</div>
          </div>
        </div>
        <div
          onMouseDown={showMenu.bind(this)}
          onMouseEnter={hoverMenu.bind(this)}
          onMouseLeave={hoverMenu.bind(this)}
          className={`menu-category${this.state.hovered === 'help' ? ' hovered' : ''}${(this.state.isShowing && this.state.hovered === 'help') ? ' showing' : ''}`}
        >
          Help
          <div className="drop-down-menu">
            <div data-func="help" className="menu-item">Contents&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;F1</div>
            <div data-func="help" className="menu-item">Search for Help on...</div>
            <div data-func="help" className="menu-item">How to Use Help</div>
            <hr />
            <div data-func="about" className="menu-item">About Solitaire</div>
          </div>
        </div>
      </div>
    );
  }
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
  };
}

export default connect(null, mapDispatchToProps)(Menu);
