import React, {Component} from "react";
import {connect} from 'react-redux';
import toggleDetailView from '../../redux/actions/toggleDetailCard';
import PropTypes from 'prop-types';

const overlay = onclick => (<div className="overlay" onClick={onclick}/>);


@connect(
  state => {
    return {
      detailView: state.detailView
    }
  },
  dispatch => {
    return {
      hide: () => dispatch(toggleDetailView({shown: false, event: {}}))
    }
  }
)
class DetailCard extends Component {
  static propTypes = {
    hide: PropTypes.func,
    detailView: PropTypes.object
  };

  constructor(props) {
    super(props);
    this.closeView = this.closeView.bind(this);
  }


  closeView() {
    document.body.className = "";
    this.props.hide();
  }

  render() {

    const that = this;
    console.log(that.props.detailView.shown);
    return (
      <div className={'no-space ' + (that.props.detailView.shown ? 'invisible' : 'hide')}>
        {overlay(that.closeView)}
        <div id="detail-card">
          {that.props.detailView.event.name}
        </div>
      </div>
    );
  }

}

export default DetailCard;



