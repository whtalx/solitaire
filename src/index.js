import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from './store';
import Sol from './components/Sol';
import './index.css';

ReactDOM.render(
  <Provider store={store}><Sol /></Provider>,
  document.getElementById('root')
);
