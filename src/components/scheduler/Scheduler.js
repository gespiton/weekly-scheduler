import React, {Component} from 'react';
import day from '../../constants/dayOfWeek';

import data from './data';
import EventCard from './EventCard';
import DetailCard from './DetailCard';

const createDay = (data, dayOfWeek) => {
  data = data || [];

  const arr = [];

  data.forEach(e => arr[e.slot - 1] = e);


  const components = [];
  for (let i = 0; i !== 6; ++i) { //todo hard code number
    const key = `${dayOfWeek} ${i}`;
    if (arr[i]) {
      components.push(<EventCard key={key}/>);
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

  render() {
    const that = this;
    return (
      <div>
        <div id="content" className={that.props.detailViewStatus ? 'modal-open' : ''}>
          <DetailCard/>
          <main id="calender">
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
      </div>
    );
  }
}

export default Scheduler;
