import React, { Component } from 'react';
import PureCanvas from './PureCanvas';
import card from '../../../../images/cards/deck.png';

const img =  new Image();
img.src = card;

export default class Canvas extends Component {
  constructor(props) {
    super(props);
    this.saveContext = this.saveContext.bind(this);
  }
  
  saveContext(ctx) {
    this.ctx = ctx;
  }

  componentDidMount() {
    this.ctx.imageSmoothingEnabled = false;
  }
  
  componentDidUpdate() {
    const { cx, cy, cardWidth, cardHeight, x, y } = this.props.render;
    this.ctx.drawImage(
      img,
      cx,
      cy,
      cardWidth,
      cardHeight,
      x,
      y,
      cardWidth,
      cardHeight
    );
  }
  
  render() {
    return (
      <PureCanvas
        width={this.props.width}
        height={this.props.height}
        contextRef={this.saveContext}
      />
    );
  }
}