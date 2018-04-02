function getPosInfo(time) {
  time = time.split(' ');
  const dayOfWeek = time[0];
  const timeOfDay = time[1] - 1;
  const indexOfEvent = time[2];
  return {dayOfWeek, timeOfDay, indexOfEvent};
}


function updateSingleEvent(oriSchedule, event) {
  const {dayOfWeek, timeOfDay, indexOfEvent} = getPosInfo(event.time);

  const newState = {...oriSchedule};

  newState[dayOfWeek] = oriSchedule[dayOfWeek].slice();
  newState[dayOfWeek][timeOfDay] = {
    slot: oriSchedule[dayOfWeek][timeOfDay].slot,
    events: oriSchedule[dayOfWeek][timeOfDay].events.slice()
  };

  newState[dayOfWeek][timeOfDay].events[indexOfEvent] = {
    name: event.name,
    place: event.place,
    week: event.week
  };

  return newState;
}

function addEvent(oriSchedule, event) {

  const {dayOfWeek, timeOfDay} = getPosInfo(event.time);

  const newState = {...oriSchedule};

  newState[dayOfWeek] = oriSchedule[dayOfWeek].slice();
  newState[dayOfWeek][timeOfDay] = {
    slot: oriSchedule[dayOfWeek][timeOfDay].slot,
    events: oriSchedule[dayOfWeek][timeOfDay].events.slice()
  };

  newState[dayOfWeek][timeOfDay].events.push({
    name: event.name,
    place: event.place,
    week: event.week
  });

  return newState;
}

function deleteEvent(oriSchedule, time) {
  const {dayOfWeek, timeOfDay, indexOfEvent} = getPosInfo(time);

  const newState = {...oriSchedule};

  newState[dayOfWeek] = oriSchedule[dayOfWeek].slice();

  const oriEvents = oriSchedule[dayOfWeek][timeOfDay].events;
  const newEvents = oriEvents.slice();
  newEvents.splice(indexOfEvent, 1);

  newState[dayOfWeek][timeOfDay] = {
    slot: oriSchedule[dayOfWeek][timeOfDay].slot,
    events: newEvents
  };

  return newState;
}

export default {
  updateSingleEvent,
  addEvent,
  deleteEvent,
  getPosInfo
}
