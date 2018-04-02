import React, {Component} from "react";
import {connect} from 'react-redux';
import PropType from 'prop-types';

@connect(
  state => {
    return {
      shown: state.loader
    }
  },
  null
)
class Loader extends Component {
  static propTypes = {
    shown: PropType.bool
  };

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div id='background-loader' className={this.props.shown ? '' : 'hide'}>
        <div className="spinner">
          <div className="dot1"/>
          <div className="dot2"/>
        </div>
      </div>
    );
  }
}

export default Loader;
