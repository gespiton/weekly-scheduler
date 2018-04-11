import React, {Component} from "react";
import PropType from 'prop-types';
import {connect} from 'react-redux';
import {deleteEvent, updateEvent, toggleLoader} from '../../../redux/actions';
import {eventType} from '../../../types/index';
import api from '../../../api/index';
import scheduleOp from '../../../utils/scheduleOperation';
import wrapper from '../../../utils/requestWrapper';

@connect(
  null,
  dispatch => {
    const _toggleLoader = shown => dispatch(toggleLoader(shown));

    return {
      modifyEvent: function (args, oriSchedule) {
        wrapper(api.updateDefaultSchedule(scheduleOp.updateSingleEvent(oriSchedule, args.event)), _toggleLoader)
          .then(function () {
            console.log("update success");
            dispatch(updateEvent(args));
          })
          .catch(function () {
            console.log("update fail");
          });
      },

      deleteEvent: function (time, oriSchedule) {
        wrapper(api.updateDefaultSchedule(scheduleOp.deleteEvent(oriSchedule, time)), _toggleLoader)
          .then(function () {
            console.log("delete success");
            dispatch(deleteEvent(time));
          })
          .catch(function (err) {
            console.log(err);
          });
      }
    }
  }
)
class EditableEvent extends Component {
  static propTypes = {
    event: eventType.isRequired,
    time: PropType.string,
    modifyEvent: PropType.func,
    deleteEvent: PropType.func
  };

  static contextTypes = {store: PropType.object};

  constructor(props) {
    super(props);
    this.state = {'panelOpen': false, ...this.props.event, oriEvent: this.props.event};

  }

  openPanel = (e) => {
    e.preventDefault();
    if (this.state.panelOpen) {
      this.setState({panelOpen: false, ...this.state.oriEvent})
    } else {
      this.setState({panelOpen: true});
    }
  };

  deleteEvent = () => {
    //todo ask if delete ?
    this.props.deleteEvent(this.props.time, this.context.store.getState().schedule);
  };


  updateEvent = () => {
    const event = {};
    event.name = this.state.name;
    event.place = this.state.place;
    event.week = this.state.week;
    event.time = this.props.time;

    this.setState({oriEvent: event}, function () {
      this.props.modifyEvent({event}, this.context.store.getState().schedule);
      this.setState({panelOpen: false});
    });
  };

  changeValue = (e) => {
    const input = e.currentTarget;
    this.setState({[input.name || 'week']: input.value});// todo unable to scale
  };

  render() {
    return (
      <div className="editable-event-card collection-item card"
           onClick={this.state.panelOpen ? undefined : this.openPanel}>
        <div className="item">
          <span className="attr">name</span>
          {
            this.state.panelOpen
              ? <input className="val" name="name" value={this.state.name} onChange={this.changeValue}/>
              : <span className='val'>{this.state.name}</span>
          }
        </div>
        <div className="item">
          <span className="attr">place</span>
          {
            this.state.panelOpen
              ? <input className="val" name="place" value={this.state.place} onChange={this.changeValue}/>
              : <span className='val'>{this.state.place}</span>
          }
        </div>

        {
          this.state.panelOpen &&
          <div className="item">
            <span className="attr">week</span>
            <select className="val" value={this.state.week} onChange={this.changeValue}>
              {/*{weekSelector(this.state.week)}*/}
              <option value='every'>every</option>
              <option value='odd'>odd</option>
              <option value='even'>even</option>
            </select>
          </div>
        }

        <div className={"operation-panel " + (this.state.panelOpen ? 'expand' : 'minimize')}>
          <span className="icon" onClick={this.deleteEvent}> <i className="fas fa-trash-alt"/> </span>
          <span className="icon" onClick={this.updateEvent}> <i className="fas fa-check"/> </span>
          <span className="icon" onClick={this.openPanel}> <i className="fas fa-chevron-up"/> </span>
        </div>
      </div>
    );
  }
}

export default EditableEvent;


