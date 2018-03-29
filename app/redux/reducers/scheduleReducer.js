import * as constants from '../../constants/actionTypes';
import initialState from './initialState';
import op from '../../utils/scheduleOperation';

export default function (state = initialState.schedule, action) {
  switch (action.type) {
    case constants.MODIFY_SCHEDULE: {
      // const event = action.event;
      // const time = event.time.split(' ');
      // const dayOfWeek = time[0];
      // const timeOfDay = time[1] - 1;
      // const indexOfEvent = time[2];
      //
      // const newState = {...state};
      //
      // newState[dayOfWeek] = state[dayOfWeek].slice();
      // newState[dayOfWeek][timeOfDay] = {
      //   slot: state[dayOfWeek][timeOfDay].slot,
      //   events: state[dayOfWeek][timeOfDay].events.slice()
      // };
      //
      // newState[dayOfWeek][timeOfDay].events[indexOfEvent] = {
      //   name: event.name,
      //   place: event.place,
      //   week: event.week
      // };

      return op.updateSingleEvent(state, action.event);
    }

    case constants.POPULATE_SCHEDULE: {
      return action.schedule;
    }

    default:
      return state;
  }
}
