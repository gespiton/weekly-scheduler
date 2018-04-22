import React, {Component} from 'react';
import day from '../../constants/dayOfWeek';

import EventCard from './EventCard';
import DetailCard from './detail-card/DetailCard';
import {connect} from 'react-redux';
import PropType from 'prop-types';
import api from '../../api/index';
import {toggleLoader, populateSchedule} from '../../redux/actions/index';
import wrapper from '../../utils/requestWrapper';
import timeUtils from '../../utils/time';

const createDay = (data, dayOfWeek) => {
  data = data || [];

  const eventArr = [];
  data.forEach(e => eventArr[e.slot - 1] = e);

  const currentPos = timeUtils.getCurrentPos();

  const components = [];
  for (let i = 0; i !== 6; ++i) { //todo hard code number
    const key = `${dayOfWeek} ${i + 1}`;
    if (eventArr[i]) {
      components.push(<EventCard key={key} pos={key} event={eventArr[i].events} isCurrent={currentPos === key}/>);
    } else {
      components.push(<div key={key} className="card empty"/>)
    }
  }

  return (
    <ul className="day" key={dayOfWeek}>
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
    const _toggleLoader = shown => dispatch(toggleLoader(shown));
    return {
      populateSchedule: () => {
        wrapper(api.getDefaultSchedule(), _toggleLoader)
          .then(doc => {
            if (doc) {
              dispatch(populateSchedule(doc));
            }
          })
          .catch(() => {
            console.log("fail to load");
          })
        ;
      },
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

  }

  componentDidMount() {
    if (Object.keys(this.props.schedule).length === 0) {
      this.props.populateSchedule();
    }
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
          {[day.monday, day.tuesday, day.wednesday, day.thursday, day.friday].map(day => createDay(this.props.schedule[day], day))}
        </main>
      </div>
    );
  }
}

export default Scheduler;
