import * as constants from '../../constants/actionTypes';
import initialState from './initialState';

export default function (state = initialState.detailView, action) {
  switch (action.type) {
    case constants.TOGGLE_DETAIL_VIEW: {
      return Object.assign({}, action);
    }

    default:
      return state;
  }
}

