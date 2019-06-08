import React from 'react';
import { connect } from 'react-redux';
import './index.scss';
import Button from '../Button';

function About(props) {
  return (
    <div className="about-contents">
      <div className="logo" />
      <Button type="ok" selected click={() => {props.close()}} />
    </div>
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
    close: () => {
      dispatch({ type: 'CLOSE', payload: 'about' });
    },
  };
}

export default connect(null, mapDispatchToProps)(About);
