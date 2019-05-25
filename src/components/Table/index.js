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
        />
      );
    }

    this.layTableau = (array) => {
      return this.makeCard({
        ...array[0],
        status: array.length > 1 ? 'downturned' : 'upturned',
        children: array.length > 1 && this.layTableau(array.slice(1, array.length))
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

    this.deckToWaste = (event) => {
      if (event.target.parentElement.classList.contains('deck')) {
        this.props.deckToWaste.bind(this)();
      }
    }
  }

  componentDidMount() {
    document.addEventListener('click', this.deckToWaste);
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.deckToWaste);
  }

  render() {
    const deck = (
      <div key="deck" className="deck">
        {
          this.props.cards.deck.length > 0 ?
            this.props.cards.deck.map((item) => {
              return this.makeCard({...item, status: "downturned"})
            })
          :
            this.makeCard({status: 'ok'})
        }
      </div>
    );

    const waste = (
      <div key="waste" className="waste">
      {
        this.props.cards.waste.map((item) => {
          return this.makeCard({...item, status: "upturned"})
        })
      }
      </div>
    );

    const foundation = this.props.cards.foundation.map((item, index) => {
      return (
        <div key={`foundation-${index}`} className={`foundation foundation-${index}`}>
          {
            item.length > 0 ?
              this.makeCard({...item[item.length - 1], status: "upturned"})
            :
              <Card key={`f${index}`} status="empty" />
          }
        </div>
      );
    });

    const tableau = this.props.cards.tableau.map((item, index) => {
      return (
        <div key={`tableau-${index}`} className={`tableau tableau-${index}`}>
          {this.layTableau(item)}
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
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Table);
