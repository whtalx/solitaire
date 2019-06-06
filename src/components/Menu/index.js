import React, { Component } from 'react';
import './index.scss';
import { connect } from 'react-redux';

function showMenu(event) {
  this.props.showMenu(!this.props.window.solitaire.menu.showing);
  document.addEventListener('mousedown', (event) => {
    if (
      !event.target.classList.contains('menu-category')
      && this.props.window.solitaire.menu.showing
    ) {
      this.props.showMenu(false);
    }
  }, { once: true });
}

function hoverMenu(event) {
  event.target.classList.contains('menu-category') && this.props.hoverMenu(event.target.firstChild.textContent.toLowerCase());
}

class Menu extends Component {
  render() {
    return (
      <div className="menu-bar">
        <div
          onMouseDown={showMenu.bind(this)}
          onMouseEnter={hoverMenu.bind(this)}
          className={`menu-category${(this.props.window.solitaire.menu.showing && this.props.window.solitaire.menu.hovered === 'game') ? ' showing' : ''}`}
        >
          Game
          <div className="drop-down-menu">
            <div onMouseDown={this.props.deal} className="menu-item">Deal&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;F2</div>
            <hr />
            <div onMouseDown={this.props.undo} className="menu-item">Undo</div>
            <div onMouseDown={this.props.deck} className="menu-item">Deck...</div>
            <div onMouseDown={this.props.options} className="menu-item">Options...</div>
            <hr />
            <div onMouseDown={this.props.exit} className="menu-item">Exit</div>
          </div>
        </div>
        <div
          onMouseDown={showMenu.bind(this)}
          onMouseEnter={hoverMenu.bind(this)}
          className={`menu-category${(this.props.window.solitaire.menu.showing && this.props.window.solitaire.menu.hovered === 'help') ? ' showing' : ''}`}
        >
          Help
          <div className="drop-down-menu">
            <div onMouseDown={this.props.help} className="menu-item">Contents&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;F1</div>
            <div onMouseDown={this.props.help} className="menu-item">Search for Help on...</div>
            <div onMouseDown={this.props.help} className="menu-item">How to Use Help</div>
            <hr />
            <div onMouseDown={this.props.about} className="menu-item">About Solitaire</div>
          </div>
        </div>
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
    showMenu: (payload) => {
      dispatch({ type: 'SHOW_MENU', payload });
    },

    hoverMenu: (payload) => {
      dispatch({ type: 'HOVER_MENU', payload });
    },

    deal: () => {
      dispatch({ type: 'DEAL' });
    },

    undo: () => {
      dispatch({ type: 'UNDO' });
    },

    deck: () => {
      dispatch({ type: 'SHOW_DECK' });
    },

    options: () => {
      dispatch({ type: 'SHOW_OPTIONS' });
    },

    exit: () => {
      dispatch({ type: 'CLOSE', payload: 'solitaire' });
    },

    help: () => {
      dispatch({ type: 'SHOW_HELP' });
    },

    about: () => {
      dispatch({ type: 'SHOW_ABOUT' });
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Menu);
