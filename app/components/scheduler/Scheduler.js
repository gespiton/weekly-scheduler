import React, {Component} from 'react';
import day from '../../constants/dayOfWeek';

import data from './data';
import EventCard from './EventCard';
import DetailCard from './detail-card/DetailCard';

const createDay = (data, dayOfWeek) => {
  data = data || [];

  const arr = [];

  data.forEach(e => arr[e.slot - 1] = e);


  const components = [];
  for (let i = 0; i !== 6; ++i) { //todo hard code number
    const key = `${dayOfWeek} ${i + 1}`;
    if (arr[i]) {

      components.push(<EventCard key={key} pos={key} event={arr[i].events}/>);
    } else {
      components.push(<div key={key} className="card empty"/>)
    }
  }

  return (
    <ul className="day">
      {components}
    </ul>
  )
};


class Scheduler extends Component {
  constructor(props) {
    super(props);

    this.pressRelease = this.pressRelease.bind(this);
    this.cardPressed = this.cardPressed.bind(this);

  }

  pressRelease(e) {
    clearTimeout(this.pressTimer);
  }

  cardPressed(e) {
    this.pressTimer = setTimeout(() => alert(e.currentTarget), 2000);
  }


  render() {
    const that = this;
    return (
      <div id="content">
        <DetailCard/>
        <main id="calender" onTouchStart={this.cardPressed} onTouchEnd={this.pressRelease}
              onMouseDown={this.cardPressed} onMouseUp={this.pressRelease}>
          <span>Mon</span>
          <span>Tus</span>
          <span>Wed</span>
          <span>Thr</span>
          <span>Fri</span>
          <span>Sat</span>
          <span>Sun</span>
          {createDay(data.monday, day.monday)}
          {createDay(data.tuesday, day.tuesday)}
          {createDay(data.wednesday, day.wednesday)}
          {createDay(data.thursday, day.thursday)}
          {createDay(data.friday, day.friday)}
          {createDay(data.saturday, day.saturday)}
          {createDay(data.sunday, day.sunday)}
        </main>
      </div>
    );
  }
}

export default Scheduler;
