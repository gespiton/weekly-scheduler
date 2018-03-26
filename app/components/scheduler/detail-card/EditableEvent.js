import React, {Component} from "react";
import PropType from 'prop-types';

class EditableEvent extends Component {
  static propTypes = {
    event: PropType.object.isRequired
  };

  constructor(props) {
    super(props);
  }

  render() {
    const e = this.props.event;
    return (
      <li className="collection-item card">
        <div>
          name: {e.name}
        </div>
        <div>
          place: {e.place}
        </div>
      </li>
    );
  }


}

export default EditableEvent;


