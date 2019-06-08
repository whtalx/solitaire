import { combineReducers } from 'redux';
import cards from './cards';
import options from './options';
import window from './window';

const reducers = combineReducers({
  cards,
  options,
  window,
});

export default reducers;
