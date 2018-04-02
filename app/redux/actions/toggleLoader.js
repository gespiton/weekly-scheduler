import {TOGGLE_LOADER} from '../../constants/actionTypes';

export default function (arg) {
  return {type: TOGGLE_LOADER, shown: arg.shown}
}

