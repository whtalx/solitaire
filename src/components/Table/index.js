import React, { Component } from 'react';
import { connect } from 'react-redux';
import Card from '../Card';
import './index.scss';

class Table extends Component {
  constructor(props) {
    super(props);

    this.makeCard = (cardObject) => {
      return (
        <Card
          key={cardObject.code}
          value={cardObject.value}
          suit={cardObject.suit}
          status={cardObject.status}
          back={this.props.cards.back}
          children={cardObject.children}
          parent={cardObject.parent}
          index={cardObject.index}
        />
      );
    }

    this.layTableau = (array, tableau, index = 0) => {
      return this.makeCard({
        ...array[0],
        status: array.length > 1 ? 'downturned' : 'upturned',
        parent: `tableau-${tableau}`,
        index: index,
        children:
          array.length > 1
          && this.layTableau(array.slice(1, array.length), tableau, ++index),
      });
    }

    this.deckSize = (length) => {
      if (length > 20) {
        return 'l';
      } else if (length > 10) {
        return 'm';
      }
      return 's';
    }

    this.wasteSize = (length) => {
      if (length > 21) {
        return 'l';
      } else if (length > 11) {
        return 'm';
      }
      return 's';
    }

    this.handleMouseDown = (event) => {
      if (
        !event.target.classList
        || !event.target.classList.contains('card')
      ) {
        return;
      }

      if (event.target.classList.contains('opened')) {
        this.props.drag.bind(this)(
          event.target.attributes.getNamedItem('data-parent').value,
          parseInt(event.target.attributes.getNamedItem('data-index').value)
        );
      } else if (event.target.parentElement.classList.contains('deck')) {
        this.props.deckToWaste.bind(this)();
      }
    }

    this.handleMouseUp = (event) => {
      if (
        !event.target.classList
        || !event.target.classList.contains('card')
      ) {
        return;
      }
      if (event.target.classList.contains('opened')) {
        this.props.drop.bind(this)(
          event.target.attributes.getNamedItem('data-parent').value,
          parseInt(event.target.attributes.getNamedItem('data-index').value)
        );
      }
    }
  }

  componentDidMount() {
    document.addEventListener('mousedown', this.handleMouseDown);
    document.addEventListener('mouseup', this.handleMouseUp);
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleMouseDown);
    document.removeEventListener('mouseup', this.handleMouseUp);
  }

  render() {
    const deck = (
      <div key="d" className="deck">
        {
          this.props.cards.deck.length > 0 ?
            this.props.cards.deck.map((item, index) => {
              return this.makeCard({
                ...item,
                status: 'downturned',
                parent: 'deck',
                index: index,
              });
            })
          :
            this.makeCard({status: 'ok'})
        }
      </div>
    );

    const waste = (
      <div key="w" className="waste">
      {
        this.props.cards.waste.map((item, index) => {
          return this.makeCard({
            ...item,
            status: 'upturned',
            parent: 'waste',
            index: index,
          });
        })
      }
      </div>
    );

    const foundation = this.props.cards.foundation.map((item, index) => {
      return (
        <div key={`f-${index}`} className={`foundation foundation-${index}`}>
          {
            item.length > 0 ?
              this.makeCard({
                ...item[item.length - 1],
                status: 'upturned',
                parent: 'foundation',
                index: index,
              })
            :
              <Card key={`f${index}`} status="empty" />
          }
        </div>
      );
    });

    const tableau = this.props.cards.tableau.map((item, index) => {
      return (
        <div key={`t-${index}`} className={`tableau tableau-${index}`}>
          {this.layTableau(item, index)}
        </div>
      );
    });

    return (
      <div className="table">
        {[
          deck,
          waste,
          foundation,
          tableau,
        ]}
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
    deckToWaste: () => {
      dispatch({ type: 'DECK_TO_WASTE' });
    },

    drag: (parent, index) => {
      dispatch({ type: 'DRAG', payload: { parent, index } });
    },

    drop: (parent, index) => {
      dispatch({ type: 'DROP', payload: { parent, index } });
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Table);
