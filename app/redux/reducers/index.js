import {combineReducers} from 'redux';
import {routerReducer} from 'react-router-redux';
import detailView from './detailViewReducer';
import scheduleReducer from './scheduleReducer';

const rootReducer = combineReducers({
  routing: routerReducer,
  'detailView': detailView,
  'schedule': scheduleReducer
});

export default rootReducer;
