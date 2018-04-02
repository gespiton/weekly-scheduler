import * as constants from '../../constants/actionTypes';

export function updateEvent(arg) {
  return {type: constants.MODIFY_SCHEDULE, event: arg.event}
}

export function deleteEvent(time) {
  return {type: constants.DELETE_EVENT, time: time}
}

export function addEvent(arg) {
  return {type: constants.ADD_EVENT, event: arg.event}
}

export function populateSchedule(schedule) {
  return {type: constants.POPULATE_SCHEDULE, schedule: schedule}
}

export function toggleDetailCard(arg) {
  return {type: constants.TOGGLE_DETAIL_VIEW, event: arg.event, shown: arg.shown, pos: arg.pos}
}

export function toggleLoader(shown) {
  return {type: constants.TOGGLE_LOADER, shown: shown}
}

