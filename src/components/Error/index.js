import React from 'react';
import { connect } from 'react-redux';
import './index.scss';
import Button from '../Button';

function Error(props) {
  return (
    <div className="error-contents">
      <div className="icon" />
      <div className="message">{props.window.error.message}</div>
      <Button type="ok" selected click={props.close} />
    </div>
  );
}

const mapStateToProps = (state) => ({
  window: state.window,
});

const mapDispatchToProps = (dispatch) => ({
  close: () => dispatch({ type: 'CLOSE', payload: 'error' }),
});

export default connect(mapStateToProps, mapDispatchToProps)(Error);