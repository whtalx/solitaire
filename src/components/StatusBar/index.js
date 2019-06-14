import React from 'react';
import { connect } from 'react-redux';
import './index.scss';

function StatusBar(props) {
  let score = props.game.status.score;
  let scoreClassName = 'score';
  if (props.game.options.scoring === 'vegas') {
    if (score < 0) {
      score = `-$${Math.abs(score)}`;
      scoreClassName += ' red';
    } else {
      score = `$${score}`;
    }
  }
  return (
    <div className="status-bar">
      <div className="description">
        {
          props.game.status.isCelebrating && props.game.status.bonus > 0
            ? `Bonus: ${props.game.status.bonus} Press Esc or a mouse button to stop...`
            : props.window.solitaire.status.description
        }
      </div>
      <div className="status">
        {
          props.game.options.scoring !== 'none'
            ? <div className={scoreClassName}>Score: {score}</div>
            : ''
        }
        {
          props.game.options.timed
            ? <div className="time">Time: {props.game.status.time}</div>
            : ''
        }
      </div>
    </div>
  );
}

const mapStateToProps = (state) => ({
  game: state.game,
  window: state.window,
});

export default connect(mapStateToProps)(StatusBar);
