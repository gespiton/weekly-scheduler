import * as constants from '../../constants/actionTypes';


export default function (state = false, action) {
  switch (action.type) {
    case constants.TOGGLE_LOADER: {
      return action.shown;
    }

    default:
      return state
  }
}
