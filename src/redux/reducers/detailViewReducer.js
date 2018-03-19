import * as constants from '../../constants/actionTypes';

export default function (state = {active: false, event: {}}, action) {
  switch (action.type) {
    case constants.TOGGLE_DETAIL_VIEW: {
      return {
        shown: action.shown,
        event: action.event
      };
    }

    default:
      return state;
  }
}

