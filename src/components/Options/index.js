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
        <div className="section-1">
          <div className="fieldset">
            <div className="legend">Draw</div>
            <Input
              type="radio"
              checked={this.state.draw === 'one'}
              label="Draw One"
              click={() => { this.setState({ draw: 'one' }) }}
            />
            <Input
              type="radio"
              checked={this.state.draw === 'three'}
              label="Draw Three"
              click={() => { this.setState({ draw: 'three' }) }}
            />
          </div>
          <Input
            type="checkbox"
            checked={this.state.timed}
            label="Timed game"
            click={() => { this.setState({ timed: !this.state.timed }) }}
          />
          <Input
            type="checkbox"
            checked={this.state.status}
            label="Status bar"
            click={() => { this.setState({ status: !this.state.status }) }}
          />
          <Input
            type="checkbox"
            checked={this.state.outline}
            label="Outline dragging"
            click={() => { this.setState({ outline: !this.state.outline }) }}
          />
        </div>
        <div className="section-2">
          <div className="fieldset">
            <div className="legend">Scoring</div>
            <Input
              type="radio"
              label="Standart"
              checked={this.state.scoring === 'standard'}
              click={() => { this.setState({ scoring: 'standard' }) }}
            />
            <Input
              type="radio"
              label="Vegas"
              checked={this.state.scoring === 'vegas'}
              click={() => { this.setState({ scoring: 'vegas' }) }}
            />
            <Input
              type="radio"
              label="None"
              checked={this.state.scoring === 'none'}
              click={() => { this.setState({ scoring: 'none' }) }}
            />
          </div>
          <Input
            type="checkbox"
            checked={this.state.cumulative}
            disabled={!(this.state.scoring === 'vegas')}
            click={() => {
              if (this.state.scoring === 'vegas') {
              this.setState({ cumulative: !this.state.cumulative });
              }
            }}
            label="Cumulative Score"
          />
          <Button
            type="ok"
            selected 
            click={() => {
              if (
                this.props.game.options.scoring !== this.state.scoring
                || this.props.game.options.draw !== this.state.draw
              ) {
                this.props.set(this.state);
                this.props.deal();
              } else {
                this.props.set(this.state);
              }
              this.props.close();
            }}
          />
          <Button type="cancel" click={() => { this.props.close() }} />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    game: state.game,
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    set: (payload) => {
      dispatch({ type: 'SET_OPTIONS', payload });
    },

    deal: () => {
      dispatch({ type: 'DEAL' });
    },

    close: () => {
      dispatch({ type: 'CLOSE', payload: 'options' });
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Options);
