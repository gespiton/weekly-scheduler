import React, {Component} from 'react';
import {connect} from 'react-redux';
import {toggleDetailCard} from '../../redux/actions/index';
import PropTypes from 'prop-types';
import {eventType} from '../../types/index';
import timeUtils from '../../utils/time';


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
    pos: PropTypes.string,
    isCurrent: PropTypes.bool
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
    if (week === 'every') {
      return true;
    }

    const even = timeUtils.isEvenWeek();
    if (week === 'even') {
      return even;
    } else {
      return !even;
    }
  }


  render() {
    const that = this;
    const events = this.props.event.filter(e => this.isInThisWeek(e.week));
    return (
      <div className={`card waves-effect waves-light ${this.props.isCurrent ? 'current' : ''}`} style={that.state.style}
           onClick={this.showDetailView}>

        {
          events.length > 0 &&
          events.map(event => (
            <div className='event-item' key={Math.random()}>{event.name}</div>
          ))
        }
      </div>
    )
  }
}


export default EventCard;
