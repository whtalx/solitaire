import React from 'react';
import { connect } from 'react-redux';
import './index.scss';
import Button from '../Button';

function Help(props) {
  return (
    <div className="error">
      <div className="error-icon" />
      <div className="error-message">Unable load Solitaire Help application</div>
      <Button type="ok" selected click={() => {props.close()}} />
    </div>
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
    close: () => {
      dispatch({ type: 'CLOSE', payload: 'help' });
    },
  };
}

export default connect(null, mapDispatchToProps)(Help);