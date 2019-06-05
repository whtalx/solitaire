import { combineReducers } from 'redux';
import cards from './cards';
import window from './window';

const reducers = combineReducers({
  cards,
  window,
});

export default reducers;
