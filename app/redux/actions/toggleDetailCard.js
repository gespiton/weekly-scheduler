import {TOGGLE_DETAIL_VIEW} from '../../constants/actionTypes';

export default function (arg) {
  return {type: TOGGLE_DETAIL_VIEW, event: arg.event, shown: arg.shown, pos: arg.pos}
}

