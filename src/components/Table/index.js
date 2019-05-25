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

    this.deck = (
      <div key="deck" className={`deck size-${this.deckSize(this.props.cards.deck.length)}`}>
        {
          this.props.cards.deck.length > 0 &&
          this.makeCard({...this.props.cards.deck[0], status: "downturned"})
        }
      </div>
    );

    this.waste = (
      <div key="waste" className={`waste size-${this.wasteSize(this.props.cards.waste.length)}`}>
      {
        this.props.cards.waste.length > 0 &&
        this.makeCard({...this.props.cards.waste[0], status: "upturned"})
      }
      </div>
    );

    this.foundation = this.props.cards.foundation.map((item, index) => {
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

    this.tableau = this.props.cards.tableau.map((item, index) => {
      return (
        <div key={`tableau-${index}`} className={`tableau tableau-${index}`}>
          {this.layTableau(item)}
        </div>
      );
    });
  }

  render() {
    return (
      <div className="table">
        {[
          this.deck,
          this.waste,
          this.foundation,
          this.tableau,
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

export default connect(mapStateToProps)(Table);
