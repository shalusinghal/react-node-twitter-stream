import { combineReducers } from 'redux';
import tweets from './tweets';
import heatMap from './heatMap';
import wordFreq from './wordFreq';

export default combineReducers({
  tweets,
  heatMap,
  wordFreq
});