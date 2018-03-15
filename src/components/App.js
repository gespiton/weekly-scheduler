import React from 'react';
import PropTypes from 'prop-types';
import { Switch, NavLink, Route } from 'react-router-dom';
import NotFoundPage from './NotFoundPage';
import Scheduler from './scheduler/Scheduler';

class App extends React.Component {
  render() {
    return (
      <div>
        <header>
          <NavLink exact to="/" >Main</NavLink>
          {' | '}
          <NavLink to="/about" >About</NavLink>
        </header>
        <Switch>
          <Route exact path="/" component={Scheduler} />
          <Route component={NotFoundPage} />
        </Switch>
      </div>
    );
  }
}

App.propTypes = {
  children: PropTypes.element
};

export default App;
