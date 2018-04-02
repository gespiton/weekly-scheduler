import {combineReducers} from 'redux';
import {routerReducer} from 'react-router-redux';
import detailView from './detailViewReducer';
import scheduleReducer from './scheduleReducer';
import loader from './loaderReducer';

const rootReducer = combineReducers({
  routing: routerReducer,
  'detailView': detailView,
  'schedule': scheduleReducer,
  loader
});

export default rootReducer;
