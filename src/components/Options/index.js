import React, { Component } from 'react';
import './index.scss';
import Input from '../Input';
import Button from '../Button';

export default class Options extends Component {
  constructor(props) {
    super(props);

    this.state = {
      draw: {
        one: true,
        three: false,
      },
      scoring: {
        standard: true,
        vegas: false,
        none: false,
        cumulative: false,
      },
      timed: false,
      status: true,
      outline: false,
    };
  }
  render() {

    return (
      <div className="options-contents">
        <div className="section-1">
          <div className="fieldset">
            <div className="legend">Draw</div>
            <Input type="radio" checked={this.state.draw.one} label="Draw One" />
            <Input type="radio" checked={this.state.draw.three} label="Draw Three" />
          </div>
          <Input type="checkbox" checked={this.state.timed} label="Timed game" />
          <Input type="checkbox" checked={this.state.status} label="Status bar" />
          <Input type="checkbox" checked={this.state.outline} label="Outline dragging" />
        </div>
        <div className="section-2">
          <div className="fieldset">
            <div className="legend">Scoring</div>
            <Input type="radio" checked={this.state.scoring.standard} label="Standart" />
            <Input type="radio" checked={this.state.scoring.vegas} label="Vegas" />
            <Input type="radio" checked={this.state.scoring.none} label="None" />
          </div>
          <Input type="checkbox" checked={this.state.scoring.cumulative} disabled={!this.state.scoring.vegas} label="Cumulative Score" />
          <Button type="ok" selected />
          <Button type="cancel" />
        </div>
      </div>
    );
  }
}
