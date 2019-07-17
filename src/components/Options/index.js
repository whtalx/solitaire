import React, { Component } from 'react';
import { connect } from 'react-redux';
import './index.scss';
import Input from '../Input';
import Button from '../Button';

class Options extends Component {
  constructor(props) {
    super(props);
    this.state = { ...this.props.game.options };
  }

  render() {
    return (
      <div className="options-contents">
        <div className="fieldset">
          <div className="legend">Draw</div>
          <Input
            type="radio"
            id="one"
            name="draw"
            label="Draw One"
            checked={this.state.draw === 'one'}
            change={() => { this.setState({ draw: 'one' }) }}
          />
          <Input
            type="radio"
            id="three"
            name="draw"
            label="Draw Three"
            checked={this.state.draw === 'three'}
            change={() => { this.setState({ draw: 'three' }) }}
          />
        </div>
        <div className="fieldset">
          <div className="legend">Scoring</div>
          <Input
            type="radio"
            id="standard"
            name="scoring"
            label="Standart"
            checked={this.state.scoring === 'standard'}
            change={() => { this.setState({ scoring: 'standard' }) }}
          />
          <Input
            type="radio"
            id="vegas"
            name="scoring"
            label="Vegas"
            checked={this.state.scoring === 'vegas'}
            change={() => { this.setState({ scoring: 'vegas' }) }}
          />
          <Input
            type="radio"
            id="none"
            name="scoring"
            label="None"
            checked={this.state.scoring === 'none'}
            change={() => { this.setState({ scoring: 'none' }) }}
          />
        </div>
        <Input
          type="checkbox"
          id="timed"
          label="Timed game"
          checked={this.state.timed}
          change={() => { this.setState({ timed: !this.state.timed }) }}
        />
        <Input
          type="checkbox"
          id="status"
          label="Status bar"
          checked={this.state.status}
          change={() => { this.setState({ status: !this.state.status }) }}
        />
        <Input
          type="checkbox"
          id="outline"
          label="Outline dragging"
          checked={this.state.outline}
          change={() => { this.setState({ outline: !this.state.outline }) }}
        />
        <Input
          type="checkbox"
          id="cumulative"
          label="Cumulative Score"
          checked={this.state.cumulative}
          disabled={this.state.scoring !== 'vegas'}
          change={() => {
            this.state.scoring === 'vegas'
              && this.setState({ cumulative: !this.state.cumulative });
          }}
        />
        <Button
          type="ok"
          click={() => {
            if (
              this.props.game.options.scoring !== this.state.scoring
              || this.props.game.options.draw !== this.state.draw
              || this.props.game.options.timed !== this.state.timed
            ) {
              this.props.setAndDeal(this.state);
            } else {
              this.props.set(this.state);
            }
            this.props.close();
          }}
        />
        <Button type="cancel" click={() => { this.props.close() }} />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  game: state.game,
});

const mapDispatchToProps = (dispatch) => ({
  close: () => dispatch({ type: 'CLOSE', payload: 'options' }),
  set: (payload) => dispatch({ type: 'SET_OPTIONS', payload }),
  setAndDeal: (payload) => {
    dispatch({ type: 'SET_OPTIONS', payload });
    dispatch({ type: 'DEAL' });
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Options);
