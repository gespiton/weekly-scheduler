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
      <div>
        <header>
          <NavLink exact to="/">Main</NavLink>
          {' | '}
          <NavLink to="/about">About</NavLink>
          {' | '}
          <NavLink to="/logIn">github log in</NavLink>
        </header>
        <Switch>
          <Route exact path="/" component={Scheduler}/>
          <Route exact path="/logIn" component={Auth}/>
          <Route component={NotFoundPage}/>
        </Switch>
      </div>
    );
  }
}

App.propTypes = {
  children: PropTypes.element
};

export default App;
