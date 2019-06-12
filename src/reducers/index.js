import { combineReducers } from 'redux';
import game from './game';
import window from './window';

const reducers = combineReducers({
  game,
  window,
});

export default reducers;
