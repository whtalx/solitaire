import React, { PureComponent } from 'react';
import './index.scss';
import { connect } from 'react-redux';
import showMenu from './scripts/showMenu';
import hoverMenu from './scripts/hoverMenu';
import describeMenu from './scripts/describeMenu';

class Menu extends PureComponent {
  render() {
    const categories = this.props.window[this.props.parent].menu.categories;
    const menu = [];
    for (let category in categories) {
      const items = [];
      for (let item in categories[category]) {
        if (categories[category][item].type === 'menu-item') {
          let className = 'menu-item';
          if (
            item === 'undo'
            && Object.keys(this.props.game.status.history).length === 0
          ) {
            className += ' disabled';
          }

          items.push(
            <div
              key={item}
              className={className}
              data-name={item}
              data-func={categories[category][item].function}
            >
              {
                categories[category][item].id === 0
                  ? categories[category][item].text.split(' ').map((itemText) =>
                      <span key={itemText}>{itemText}</span>
                    )
                  : categories[category][item].text
              }
            </div>
            );
        } else if (categories[category][item].type === 'break') {
          items.push(
            <hr key={item} onMouseEnter={this.clearDescription} />
          );
        }
      }

      let className = 'menu-category';
      if (this.props.window[this.props.parent].menu.hovered === category) {
        className += ' hovered';
        this.props.window[this.props.parent].menu.isShowing
          && (className += ' showing');
      }

      menu.push(
        <div
          key={`menu-category-${category}`}
          className={className}
          onMouseDown={showMenu.bind(this)}
          onMouseEnter={hoverMenu.bind(this)}
          onMouseLeave={hoverMenu.bind(this)}
        >
          {category.charAt(0).toUpperCase() + category.slice(1)}
          <div
            className={`drop-down-menu ${category}`}
            onMouseMove={describeMenu.bind(this)}
          >
            {items}
          </div>
        </div>
      );
    };

    return (
      <div className="menu-bar">
        {menu}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  game: state.game,
  window: state.window,
});

const mapDispatchToProps = (dispatch) => ({
  deal: () => dispatch({ type: 'DEAL' }),
  undo: () => dispatch({ type: 'UNDO' }),
  back: () => dispatch({ type: 'SHOW_WINDOW', payload: 'back' }),
  options: () => dispatch({ type: 'SHOW_WINDOW', payload: 'options' }),
  exit: () => dispatch({ type: 'CLOSE', payload: 'solitaire' }),
  help: () => dispatch({ type: 'SHOW_WINDOW', payload: 'help' }),
  statistics: () => dispatch({ type: 'SHOW_WINDOW', payload: 'statistics' }),
  showMenu: (payload) => dispatch({ type: 'SHOW_MENU', payload }),
  hoverMenu: (payload) => dispatch({ type: 'HOVER_MENU', payload }),
  describeMenu: (payload) => dispatch({ type: 'DESCRIBE_MENU', payload }),
  stopCelebrating: () => {
    dispatch({ type: 'STOP_CELEBRATING' });
    dispatch({ type: 'SHOW_WINDOW', payload: 'restart' });
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Menu);
