import React, {Component} from 'react';
import day from '../../constants/dayOfWeek';

import EventCard from './EventCard';
import DetailCard from './detail-card/DetailCard';
import {connect} from 'react-redux';
import PropType from 'prop-types';
import api from '../../api/index';
import populateSchedule from '../../redux/actions/populateSchedule';

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


@connect(
  state => {
    return {
      schedule: state.schedule
    }
  },
  dispatch => {
    return {
      populateSchedule: schedule => dispatch(populateSchedule(schedule))
    }
  }
)
class Scheduler extends Component {
  static propTypes = {
    schedule: PropType.object,
    populateSchedule: PropType.func
  };

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

  componentDidMount() {
    api.getDefaultSchedule()
      .then(doc => {
        if (doc.exists) {
          this.props.populateSchedule(doc.data());
        }
      });
  }


  render() {
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
          {createDay(this.props.schedule.monday, day.monday)}
          {createDay(this.props.schedule.tuesday, day.tuesday)}
          {createDay(this.props.schedule.wednesday, day.wednesday)}
          {createDay(this.props.schedule.thursday, day.thursday)}
          {createDay(this.props.schedule.friday, day.friday)}
          {createDay(this.props.schedule.saturday, day.saturday)}
          {createDay(this.props.schedule.sunday, day.sunday)}
        </main>
      </div>
    );
  }
}

export default Scheduler;
