import React, { Component } from 'react';
import Menu from '../Menu';
import Table from '../Table';
import Window from '../Window';
import StatusBar from '../StatusBar';
import { connect } from 'react-redux';

class Sol extends Component {
  constructor(props) {
    super(props);
    this.state = {
      key: null,
    };
  }

  handleKeyDown(event) {
    if (
      event.which === this.state.key
      || (event.which !== 112 && event.which !== 113)
    ) {
      return;
    }

    this.setState({ key: event.which });
    if (event.which === 112) {
      this.props.help();
    } else if (event.which === 113) {
      this.props.deal();
    }
  }

  handleKeyUp(event) {
    event.which === this.state.key && this.setState({ key: null });
  }

  componentDidMount() {
    document.addEventListener('keydown', this.handleKeyDown.bind(this));
    document.addEventListener('keyup', this.handleKeyUp.bind(this));
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeyDown.bind(this));
    document.removeEventListener('keyup', this.handleKeyUp.bind(this));
  }

  render() {
    return (
      <Window
        name="solitaire"
        children={[
          <Menu key="menu" />,
          <Table key="table" />,
          <StatusBar key="statusBar" />,
        ]}
      />
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
    deal: () => {
      dispatch({ type: 'DEAL' });
    },

    help: () => {
      dispatch({ type: 'SHOW_HELP' });
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Sol);
