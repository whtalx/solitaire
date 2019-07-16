import React, { Component } from 'react';
import { connect } from 'react-redux';
import './index.scss';
import Menu from './Menu';
import Back from './Back';
import Help from './Help';
import Bsod from './Bsod';
import Table from './Table';
import Error from './Error';
import Window from './Window';
import Options from './Options';
import Restart from './Restart';
import StatusBar from './StatusBar';
import Statistics from './Statistics';

class Sol extends Component {
  constructor(props) {
    super(props);
    this.state = {
      key: null,
      bsod: false,
    };

    this.handleKeyDown = (event) => {
      if (
        event.which === this.state.key
        || !this.props.window.solitaire.isShowing
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

      if (event.which === 112) {
        this.props.help();
      } else if (event.which === 113) {
        this.props.deal();
      } else if (event.which === 17) {
      } else if (
        event.which === 65
        && event.ctrlKey
      ) {
        this.props.fundAll();
      }

      this.setState({ key: event.which });
    }

    this.handleKeyUp = (event) => {
      event.which === this.state.key && this.setState({ key: null });
    }

    this.handleRightMouseButton = (event) => {
      event.preventDefault();
    }

    this.handleMouseDown = (event) => {
      if (event.target.classList.contains('root')) {
        this.props.deactivate();
      }
    }
  }

  componentDidMount() {
    document.addEventListener('keydown', this.handleKeyDown);
    document.addEventListener('keyup', this.handleKeyUp);
    document.addEventListener('contextmenu', this.handleRightMouseButton);
    document.addEventListener('mousedown', this.handleMouseDown);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeyDown);
    document.removeEventListener('keyup', this.handleKeyUp);
    document.removeEventListener('contextmenu', this.handleRightMouseButton);
    document.removeEventListener('mousedown', this.handleMouseDown);
  }

  render() {
    if (this.state.bsod) { return <Bsod /> }

    let className = 'root';
    if (this.props.window.solitaire.isShowing) {
      !this.props.game.status.isGameStarted
        && (className += ' progress');
      this.props.window.cursor
        && (className += ` ${this.props.window.cursor}`);
    } else {
      !window.history.back()
        && setTimeout(() => { this.setState({ bsod: true }) }, 2000);
      className += ' wait';
    }

    return (
      <div className={className}>
        {this.props.window.solitaire.isShowing &&
        <Window
          name="solitaire"
          children={[
            <Menu key="menu" parent="solitaire" />,
            <Table key="table" />,
            this.props.game.options.status
              ? <StatusBar key="statusBar" />
              : '',
          ]}
        />}
        {
          this.props.window.back.isShowing
            && <Window name="back" children={<Back />} />
        }
        {
          this.props.window.options.isShowing
            && <Window name="options" children={<Options />} />
        }
        {
          this.props.window.help.isShowing
            && <Window name="help" children={<Help />} />
        }
        {
          this.props.window.statistics.isShowing
            && <Window name="statistics" children={<Statistics />} />
        }
        {
          this.props.window.restart.isShowing
            && <Window name="restart" children={<Restart />} />
        }
        {
          this.props.window.error.isShowing
            && <Window name="error" children={<Error />} />
        }
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  game: state.game,
  window: state.window,
});

const mapDispatchToProps = (dispatch) => ({
  deal: () => dispatch({ type: 'DEAL' }),
  help: () => dispatch({ type: 'SHOW_WINDOW', payload: 'help' }),
  deactivate: () => dispatch({ type: 'DEACTIVATE' }),
  fundAll: () => dispatch({ type: 'FUND_ALL' }),
});

export default connect(mapStateToProps, mapDispatchToProps)(Sol);
