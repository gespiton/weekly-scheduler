import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {ConnectedRouter} from 'react-router-redux';
import {Provider} from 'react-redux';
import App from './App';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

// require('jquery');
require('materialize-css');
// console.log(m);

export default class Root extends Component {
  render() {
    const {store, history} = this.props;
    return (
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <MuiThemeProvider>
            <App/>
          </MuiThemeProvider>
        </ConnectedRouter>
      </Provider>
    );
  }
}

Root.propTypes = {
  store: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired
};
