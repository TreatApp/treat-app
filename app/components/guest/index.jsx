import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Map from './map';
import List from './list';
import Event from './event';
import { getEvents } from './actions';

class Guest extends Component {

   constructor(props) {
      super(props);

      this.state = this.makeInitialState(props);
   }

   makeInitialState(props) {
      return {
         viewMode: Guest.viewMode.list
      };
   }

   componentWillMount() {
      const {dispatch} = this.props;
      dispatch(getEvents());
   }

   render() {
      let showMap = this.state.viewMode === Guest.viewMode.map;
      let listClass = showMap ? 'btn btn-default' : 'btn btn-primary';
      let mapClass = showMap ? 'btn btn-primary' : 'btn btn-default';
      let { events } = this.props.eventsState.toJS();

      return (
         <div className="container">
            <div className="btn-group btn-group-justified btn-group-sm">
               <a href="#" className={listClass} onClick={this.showList}>List</a>
               <a href="#" className={mapClass} onClick={this.showMap}>Map</a>
            </div>
            {showMap ? <Map events={events} /> : <List events={events} />}
         </div>
      );
   }

   showList = ev => {
      ev.preventDefault();
      this.setState({ viewMode: Guest.viewMode.list });
      ev.target.blur();
   };

   showMap = ev => {
      ev.preventDefault();
      this.setState({ viewMode: Guest.viewMode.map });
      ev.target.blur();
   };
}

Guest.viewMode = { list: 0, map: 1 };

Guest.propTypes = {
   dispatch: PropTypes.func.isRequired,
   appState: PropTypes.object.isRequired,
   eventsState: PropTypes.object.isRequired
};

function propProvider(reduxState, props) {
   const {appState, eventsState} = reduxState;

   return {
      appState,
      eventsState
   };
}

export default connect(propProvider)(Guest);