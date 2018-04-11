import React, {Component} from "react";

class AppBar extends Component {
  constructor(props) {
    super(props);
    this.state = {open: false};
  }

  clicked = () => {
    this.setState({open: true});
  };

  animated = () => {

  };

  render() {
    return (
      <div id='app-bar'>
        {/*<drawer/>*/}
        <div id='drawer-toggler' className='ripple' onClick={this.clicked}>
          <i className="fas fa-bars fa-2x"/>
        </div>
        <h6 id="schedule-title">default</h6>
      </div>
    );
  }
}

export default AppBar;
