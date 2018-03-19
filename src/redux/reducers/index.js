import {combineReducers} from 'redux';
import {routerReducer} from 'react-router-redux';
import detailView from './detailViewReducer';

const rootReducer = combineReducers({
  routing: routerReducer,
  'detailView': detailView
});

export default rootReducer;
