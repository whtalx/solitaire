import { combineReducers } from 'redux';
import cards from './cards';
import game from './game';
import options from './options';
import window from './window';

const reducers = combineReducers({
  cards,
  game,
  options,
  window,
});

export default reducers;
