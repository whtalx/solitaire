import React from 'react';
import { connect } from 'react-redux';
import './index.scss';
import Button from '../Button';

function Restart(props) {
  return (
    <div className="restart">
      <div className="restart-icon" />
      <div className="restart-message">Deal Again?</div>
      <Button type="ok" selected click={() => {props.close(); props.deal();}} />
      <Button type="cancel" click={() => {props.close()}} />
    </div>
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
    deal: () => {
      dispatch({ type: 'DEAL' });
    },

    close: () => {
      dispatch({ type: 'CLOSE', payload: 'restart' });
    },
  };
}

export default connect(null, mapDispatchToProps)(Restart);