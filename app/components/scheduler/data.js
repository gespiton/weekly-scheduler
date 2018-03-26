const monday = 'monday';
const tuesday = 'tuesday';
const wednesday = 'wednesday';
const thursday = 'thursday';
const friday = 'friday';
const saturday = 'saturday';
const sunday = 'sunday';

const days = [monday, tuesday, wednesday, thursday, friday, saturday, sunday];

const res = {};
for (const day in days) {

  const events = [1, 2, 3, 4, 5, 6].map(i => ({
    slot: i,
    events: [
      {
        name: 'software',
        week: 'every',
        place: 'haiyun'
      }
    ]
  }));

  events[2].events.push({
    name: 'hardware',
    week: 'even',
    place: 'haven'
  });

  events[4].events = [];

  res[days[day]] = events;
}

export default res;
