import React, {Component} from "react";
import {connect} from 'react-redux';
import toggleDetailView from '../../../redux/actions/toggleDetailCard';
import PropTypes from 'prop-types';
import EditableEvent from './EditableEvent';

const overlay = onclick => (<div className="overlay" onClick={onclick}/>);

@connect(
  state => {
    return {
      detailView: state.detailView
    }
  },
  dispatch => {
    return {
      hide: () => dispatch(toggleDetailView({shown: false, event: []}))
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
    const event = this.props.detailView.event;
    const pos = this.props.detailView.pos;
    return (
      <div className={'no-space ' + (that.props.detailView.shown ? 'invisible' : 'hidden')}>
        {overlay(that.closeView)}
        <div id="detail-card" className={that.props.detailView.shown ? 'expand' : 'minimize'}>
          <span>{pos}</span>
          <ul className="collection">
            {event.map((e, i) => (<EditableEvent key={`${pos} ${i}`} event={e}/>))}
          </ul>
        </div>
      </div>
    );
  }

}

export default DetailCard;



