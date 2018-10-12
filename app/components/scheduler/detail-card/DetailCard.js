import React, {Component} from "react";
import {connect} from 'react-redux';
import api from '../../../api/index';
import PropType from 'prop-types';
import EditableEvent from './EditableEvent';
import scheduleOp from '../../../utils/scheduleOperation';
import wrapper from '../../../utils/requestWrapper';
import {toggleLoader, addEvent, toggleDetailCard} from '../../../redux/actions/index';


const overlay = onclick => (<div className="overlay" onClick={onclick}/>);

@connect(
  state => {
    let detailView = state.detailView;
    // if pos is provided, update the detailview accordingly
    if (state.detailView.pos) {
      const time = scheduleOp.getPosInfo(state.detailView.pos);
      detailView = {
        pos: state.detailView.pos,
        event: state.schedule[time.dayOfWeek][time.timeOfDay].events,
        shown: state.detailView.shown
      };
    }
    return {
      detailView: detailView
    }
  },


  dispatch => {
    const _toggleLoader = shown => dispatch(toggleLoader(shown));
    return {

      hide: () => dispatch(toggleDetailCard({shown: false, event: []})),

      addEvent: (args, oriSchedule) => {
        wrapper(api.updateDefaultSchedule(scheduleOp.addEvent(oriSchedule, args.event)), _toggleLoader)
          .then(function () {
            dispatch(addEvent(args))
          })
          .catch(err => {
            console.log(err);
          });
      },
    }
  }
)
class DetailCard extends Component {
  static propTypes = {
    hide: PropType.func,
    addEvent: PropType.func,
    detailView: PropType.object
  };

  static contextTypes = {store: PropType.object};

  constructor(props) {
    super(props);
  }

  closeView = () => {
    // document.body.className = "";
    this.props.hide();
  };

  addEvent = () => {

    const event = {
      time: this.props.detailView.pos,
      name: 'default',
      place: 'none',
      week: 'every'
    };

    this.props.addEvent({event}, this.context.store.getState().schedule);
  };

  render() {
    const that = this;
    const event = this.props.detailView.event;
    const pos = this.props.detailView.pos;
    return (
      <div id='detail-card-wrapper' className={'no-space ' + (that.props.detailView.shown ? 'invisible' : 'hidden')}>
        {overlay(that.closeView)}
        {
          <div id="detail-card" className={that.props.detailView.shown ? '' : 'minimize'}>
            <span id='event-time'>{pos}</span>
            <ul className="collection">
              {event.map((e, i) => (
                <EditableEvent time={`${pos} ${i}`} key={`${ Date.now()} ${pos} ${i}`} event={e}/>))}
            </ul>
            <a onClick={this.addEvent} className="btn-floating right btn-large waves-effect waves-light green"><i
              className="material-icons">+</i></a>
          </div>
        }
      </div>
    );
  }

}

export default DetailCard;



