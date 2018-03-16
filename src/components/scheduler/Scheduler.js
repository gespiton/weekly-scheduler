import React, { Component } from 'react';

import data from './data';
import EventCard from './EventCard';

const createDay = (data) => {
  const arr = [];

  data.forEach(e => arr[e.slot - 1] = e);


  const components = [];
  for (let i = 0; i != arr.length; ++i) {
    if (arr[i]) {
      components.push(<EventCard />);
    } else {
      components.push(<div className="empty-card" />)
    }
  }

  return (
    <ul className="day">
      {components}
    </ul>
  )
}

class Scheduler extends Component {

  render() {
    createDay(data.monday);
    return (
      <div id="content">
        <main id="calender">
          <span>Mon</span>
          <span>Tus</span>
          <span>Wed</span>
          <span>Thr</span>
          <span>Fri</span>
          <span>Sat</span>
          <span>Sun</span>
          {createDay(data.monday)}
          <ul className="day" id="Tus">
            <li>software</li>
            <li>软件工程</li>
            <li>software</li>
            <li>software</li>
          </ul>
          <ul className="day" id="Wed">
            <li>software</li>
            <li>software</li>
            <li>software</li>
            <li>software</li>
            <li>software</li>
          </ul>
          <ul className="day" id="Thr">
            <li>software</li>
            <li>software</li>
            <li>software</li>
            <li>software</li>
          </ul>
          <ul className="day" id="Fri">
            <li>software</li>
            <li>software</li>
            <li>software</li>
            <li>software</li>
          </ul>
          <ul className="day" id="Sat">
            <li>software</li>
            <li>software</li>
            <li>software</li>
            <li>software</li>
          </ul>
          <ul className="day" id="Sun">
            <li>software</li>
            <li>software</li>
            <li>software</li>
            <li>software</li>
          </ul>


        </main>
        <footer>footer</footer>
      </div>
    );
  }
}

export default Scheduler;
