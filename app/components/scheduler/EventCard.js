import React, {Component} from 'react';
import {connect} from 'react-redux';
import {toggleDetailCard} from '../../redux/actions/index';
import PropTypes from 'prop-types';
import {eventType} from '../../types/index';


@connect(
  null,
  dispatch => {
    return {
      toggleDetailView: args => dispatch(toggleDetailCard(args))
    }
  }
)
class EventCard extends Component {
  static propTypes = {
    toggleDetailView: PropTypes.func,
    event: PropTypes.arrayOf(eventType),
    pos: PropTypes.string
  };

  constructor(props) {
    super(props);
    this.state = {style: {}};
  }

  showDetailView = () => {
    // document.body.className = 'modal-open';
    const events = this.props.event.filter(e => this.isInThisWeek(e.week));
    this.props.toggleDetailView({shown: true, event: events, pos: this.props.pos})
  };


  isInThisWeek(week) {
    //todo implement this
    return true;
  }


  render() {
    const that = this;
    const events = this.props.event.filter(e => this.isInThisWeek(e.week));
    return (
      <div className="card waves-effect waves-light" style={that.state.style} onClick={this.showDetailView}>
        {
          events.length === 1 &&
          <div>{events[0].name}</div>
        }
        {
          events.length > 1 &&
          <div>multiple</div>
        }
      </div>
    )
  }
}


export default EventCard;
