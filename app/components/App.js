/* eslint-disable react/jsx-key */
import React from 'react';
import PropTypes from 'prop-types';
import {Switch, NavLink, Route} from 'react-router-dom';
import NotFoundPage from './NotFoundPage';
import Scheduler from './scheduler/Scheduler';
import Auth from './Auth';
import Loader from './Loader';
import AppBar from './app-bar/AppBar';


class App extends React.Component {
  render() {
    return (
      [
        <AppBar key={"add-bar"}/>,
        <Loader key={'background-loader'}/>,
        < Switch key={'route'}>
          < Route exact path="/" component={Scheduler}/>
          < Route exact path="/logIn" component={Auth}/>
          < Route component={NotFoundPage}/>
        </Switch>
      ]
    );
  }
}

App.propTypes = {
  children: PropTypes.element
};

export default App;
