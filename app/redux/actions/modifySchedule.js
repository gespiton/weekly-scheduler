import {MODIFY_SCHEDULE} from '../../constants/actionTypes';

export default function (arg) {
  return {type: MODIFY_SCHEDULE, event: arg.event}
}
