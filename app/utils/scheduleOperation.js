function updateSingleEvent(oriSchedule, event) {
  const time = event.time.split(' ');
  const dayOfWeek = time[0];
  const timeOfDay = time[1] - 1;
  const indexOfEvent = time[2];

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

export default {
  updateSingleEvent
}
