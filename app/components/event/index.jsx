import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

class Event extends Component {

   constructor(props) {
      super(props);

      this.state = this.makeInitialState(props);
   }

   makeInitialState(props) {
      return {
         eventId: props.params.id
      };
   }

   render() {
      let eventId = this.state.eventId;
      let { eventsState, userEventsState } = this.props;
      let { events } = eventsState.merge(userEventsState).toJS();

      let event = events.find(e => {
         return e.eventId = eventId;
      });

      if(!event) {
         return <div>Event not found</div>;
      }

      let { title } = event;
      return (
         <div>
            <h1>{title}</h1>
         </div>
      );
   }
}

Event.propTypes = {
   dispatch: PropTypes.func.isRequired,
   appState: PropTypes.object.isRequired,
   eventsState: PropTypes.object.isRequired,
   userEventsState: PropTypes.object.isRequired
};

function propProvider(reduxState, props) {
   const {appState, eventsState, userEventsState} = reduxState;

   return {
      appState,
      eventsState,
      userEventsState
   };
}

export default connect(propProvider)(Event);