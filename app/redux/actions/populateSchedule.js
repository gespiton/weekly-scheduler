import {POPULATE_SCHEDULE} from '../../constants/actionTypes';

export default function (schedule) {
  return {type: POPULATE_SCHEDULE, schedule: schedule}
}
