/* eslint-disable react/jsx-key */
import React from 'react';
import PropTypes from 'prop-types';
import {Switch, NavLink, Route} from 'react-router-dom';
import NotFoundPage from './NotFoundPage';
import Scheduler from './scheduler/Scheduler';
import Auth from './Auth';


class App extends React.Component {
  render() {
    const that = this;
    return (
      [
        <div id="nav" className="navbar-fixed">
          <nav className="nav-wrapper">
            <ul id="nav-mobile">
              <li>
                <NavLink exact to="/">Main</NavLink>
              </li>
              <li>
                <NavLink to="/edit">edit</NavLink>
              </li>
              <li>
                <NavLink to="/logIn">github log in</NavLink>
              </li>
            </ul>
          </nav>
        </div>,
        <div id="main">
          <Switch>
            <Route exact path="/" component={Scheduler}/>
            {/*<Route exact path="/logIn" component={Auth}/>*/}
            <Route component={NotFoundPage}/>
          </Switch>
        </div>
      ]
    );
  }
}

App.propTypes = {
  children: PropTypes.element
};

export default App;
