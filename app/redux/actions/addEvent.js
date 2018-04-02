import {ADD_EVENT} from '../../constants/actionTypes';

export default function (arg) {
  return {type: ADD_EVENT, event: arg.event}
}
