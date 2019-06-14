import React from 'react';
import { connect } from 'react-redux';
import './index.scss';
import Button from '../Button';

function Restart(props) {
  return (
    <div className="restart">
      <div className="restart-icon" />
      <div className="restart-message">Deal Again?</div>
      <Button type="ok" selected click={props.closeAndDeal} />
      <Button type="cancel" click={props.close} />
    </div>
  );
}

const mapDispatchToProps = (dispatch) => ({
  close: () => dispatch({ type: 'CLOSE', payload: 'restart' }),
  closeAndDeal: () => {
    dispatch({ type: 'CLOSE', payload: 'restart' });
    dispatch({ type: 'DEAL' });
  },
});

export default connect(null, mapDispatchToProps)(Restart);