import React, { Component } from 'react';
import './index.scss';
import Menu from './Menu';
import Table from './Table';
import Window from './Window';
import StatusBar from './StatusBar';
import Back from './Back';
import Options from './Options';
import Help from './Help';
import About from './About';
import Bsod from './Bsod';
import { connect } from 'react-redux';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      key: null,
      bsod: false,
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

  handleRightMouseButton(event) {
    event.preventDefault();
  }

  componentDidMount() {
    document.addEventListener('keydown', this.handleKeyDown.bind(this));
    document.addEventListener('keyup', this.handleKeyUp.bind(this));
    document.addEventListener('contextmenu', this.handleRightMouseButton);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeyDown.bind(this));
    document.removeEventListener('keyup', this.handleKeyUp.bind(this));
    document.removeEventListener('contextmenu', this.handleRightMouseButton);
  }

  render() {
    if (!this.props.window.solitaire.isShowing) {
      setTimeout(() => { this.setState({ bsod: true })}, 2000);
    }
    if (this.state.bsod) {
      return <Bsod />
    }
    return (
      <div className="root">
        {this.props.window.solitaire.isShowing &&
        <Window
          name="solitaire"
          children={[
            <Menu key="menu" />,
            <Table key="table" />,
            this.props.options.status ? <StatusBar key="statusBar" /> : '',
          ]}
        />}
        {this.props.window.back.isShowing && <Window name="back" children={<Back />} />}
        {this.props.window.options.isShowing && <Window name="options" children={<Options />} />}
        {this.props.window.help.isShowing && <Window name="help" children={<Help />} />}
        {this.props.window.about.isShowing && <Window name="about" children={<About />} />}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    options: state.options,
    window: state.window,
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    deal: () => {
      dispatch({ type: 'DEAL' });
    },

    help: () => {
      dispatch({ type: 'SHOW_WINDOW', payload: 'help' });
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
