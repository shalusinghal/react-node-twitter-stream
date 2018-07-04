import { combineReducers } from 'redux';
import tweets from './tweets';
import heatMap from './heatMap';

export default combineReducers({
  tweets,
  heatMap
});