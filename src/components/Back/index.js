import React, { Component } from 'react';
import { connect } from 'react-redux';
import './index.scss';
import Button from '../Button';

class Back extends Component {
  constructor(props) {
    super(props);
    this.state = { selected: this.props.options.back };
  }

  render() {
    const grid = [];
    for (let i = 0; i < 12; i++) {
      grid.push(
        <div
          key={`bg-${i}`}
          className={`grid-item back-${i}${this.state.selected === i ? ' selected' : ''}`}
          onMouseDown={(event) => {event.button === 0 && this.setState({ selected: i })}}
        />
      );
    }
    return (
      <div className="back-contents">
        <div className="back-grid">{grid}</div>
        <Button
          type="ok"
          selected
          click={() => {
            this.props.set(this.state.selected);
            this.props.close();
          }}
        />
        <Button type="cancel" click={() => { this.props.close() }} />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    options: state.options,
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    set: (payload) => {
      dispatch({ type: 'SET_BACK', payload });
    },

    close: () => {
      dispatch({ type: 'CLOSE', payload: 'back' });
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Back);
