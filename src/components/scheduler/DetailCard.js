import React, {Component} from "react";
import {connect} from 'react-redux';

const overlay = (
  <div className="overlay"/>);


@connect(
  state => {
    return {
      detailView: state.detailView
    }
  },
  null
)
class DetailCard extends Component {
  constructor(props) {
    super(props);
  }

  render() {

    const that = this;
    console.log(that.props.detailView.shown);
    return (
      <div className={that.props.detailView.shown ? 'invisible' : 'hide'}>
        {overlay}
        <div id="detail-card">
          {that.props.detailView.event.name}
        </div>
      </div>
    );
  }

}

export default DetailCard;



