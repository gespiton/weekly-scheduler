import * as constants from '../../constants/actionTypes';
import initialState from './initialState';
import op from '../../utils/scheduleOperation';

export default function (state = initialState.schedule, action) {
  switch (action.type) {
    case constants.MODIFY_SCHEDULE: {
      return op.updateSingleEvent(state, action.event);
    }

    case constants.ADD_EVENT: {
      return op.addEvent(state, action.event)
    }

    case constants.DELETE_EVENT: {
      return op.deleteEvent(state, action.time);
    }

    case constants.POPULATE_SCHEDULE: {
      return action.schedule;
    }

    default:
      return state;
  }
}
