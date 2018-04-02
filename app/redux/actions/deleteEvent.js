import {DELETE_EVENT} from '../../constants/actionTypes';

export default function (time) {
  return {type: DELETE_EVENT, time: time}
}
