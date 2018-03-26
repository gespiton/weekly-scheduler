import * as constants from '../../constants/actionTypes';

export default function (state = {active: false, event: {}}, action) {
  switch (action.type) {
    case constants.TOGGLE_DETAIL_VIEW: {
      return Object.assign({}, action);
    }

    default:
      return state;
  }
}

