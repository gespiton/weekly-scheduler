import days from '../constants/dayOfWeek';

function getCurrentWeek() {
  const termStart = new Date('2018/2/26');
  const now = new Date();
  const pastWeek = (now - termStart) / (1000 * 60 * 60 * 24 * 7);
  return Math.ceil(pastWeek);
}

function isEvenWeek() {
  return getCurrentWeek() % 2 === 0;
}


const timeSegment = [
  {
    start: '8:00',
    end: '9:40'
  },
  {
    start: '10:10',
    end: '11:50'
  },
  {
    start: '14:30',
    end: '16:10'
  },
  {
    start: '16:40',
    end: '18:20'
  },
  {
    start: '19:10',
    end: '20:50'
  },
  {
    start: '21:20',
    end: '23:00'
  }
];

const daysOfWeek = ['', days.monday, days.tuesday, days.wednesday, days.thursday, days.friday, days.saturday, days.sunday];

function compareTime(lhs, rhs) {
  const l = lhs.split(':').map(i => Number(i));
  const r = rhs.split(':').map(i=>Number(i));

  // rhs >= lhs

  if (r[0] > l[0]) {

    return true;
  } else if (r[0] === l[0]) {

    return r[1] >= l[1];
  }

  return false;
}

function currentPos() {
  const now = new Date();
  const time = `${now.getHours()}:${now.getMinutes()}`;
  let dayOfWeekIndex = now.getDay();

  let eventIndex = 1;


  if (compareTime(time, timeSegment[0].start)) {

  } else if (compareTime(timeSegment[timeSegment.length - 1].end, time)) {
    dayOfWeekIndex += 1;
  } else {
    timeSegment.map((v, i) => {
      if (compareTime(v.start, time)) {
        if (compareTime(time, v.end)) {
          eventIndex = i + 1;
        } else {
          eventIndex = i + 2;
        }
      }
    });


    return `${daysOfWeek[dayOfWeekIndex]} ${eventIndex}`
  }
}

export default {getCurrentWeek, isEvenWeek, getCurrentPos: currentPos}


