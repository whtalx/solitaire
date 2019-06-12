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
import Restart from './Restart';

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
      || this.props.window.activity[this.props.window.activity.length - 1] !== 'solitaire'
      || this.props.window.solitaire.isMinimized
      || (
        event.which !== 112     //F1
        && event.which !== 113  //F2
        && event.which !== 17   //ctrl
        && event.which !== 65   //A
        )
    ) {
      return;
    }
    console.log(event.which)

    if (event.which === 112) {
      this.props.help();
    } else if (event.which === 113) {
      this.props.deal();
    } else if (event.which === 17) {
    } else if (
      event.which === 65
      && this.state.key === 17
    ) {
      this.props.fundAll();
    }

    this.setState({ key: event.which });
  }

  handleKeyUp(event) {
    event.which === this.state.key && this.setState({ key: null });
  }

  handleRightMouseButton(event) {
    event.preventDefault();
  }

  handleMouseDown(event) {
    if (event.target.classList.contains('root')) {
      this.props.deactivate();
    }
  }

  componentDidMount() {
    document.addEventListener('keydown', this.handleKeyDown.bind(this));
    document.addEventListener('keyup', this.handleKeyUp.bind(this));
    document.addEventListener('contextmenu', this.handleRightMouseButton);
    document.addEventListener('mousedown', this.handleMouseDown.bind(this));
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeyDown.bind(this));
    document.removeEventListener('keyup', this.handleKeyUp.bind(this));
    document.removeEventListener('contextmenu', this.handleRightMouseButton);
    document.removeEventListener('mousedown', this.handleMouseDown.bind(this));
  }

  render() {
    if (!this.props.window.solitaire.isShowing) {
      if (window.history.length > 1) {
        window.history.back();
      }
      setTimeout(() => { this.setState({ bsod: true })}, 2000);
    }
    if (this.state.bsod) {
      return <Bsod />
    }
    return (
      <div className={`root${this.props.window.solitaire.isShowing ? (this.props.window.solitaire.cursor ? ` ${this.props.window.solitaire.cursor}` : '') : ' wait'}`}>
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
        {this.props.window.restart.isShowing && <Window name="restart" children={<Restart />} />}
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

    deactivate: () => {
      dispatch({ type: 'DEACTIVATE' });
    },

    fundAll: () => {
      dispatch({ type: 'FUND_ALL' });
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
