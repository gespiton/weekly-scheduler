import React, { Component } from 'react';

class Scheduler extends Component {

    render() {
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
                    <ul className="day" id="Mon">
                        <li>software</li>
                        <li>software</li>
                        <li>software</li>
                        <li>software</li>
                    </ul>
                    <ul className="day" id="Tus">
                        <li>software</li>
                        <li>software</li>
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