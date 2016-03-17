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
      let { eventsState, myEventsState } = this.props;
      let { events } = eventsState.merge(myEventsState).toJS();

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
   myEventsState: PropTypes.object.isRequired
};

function propProvider(reduxState, props) {
   const {appState, eventsState, myEventsState} = reduxState;

   return {
      appState,
      eventsState,
      myEventsState
   };
}

export default connect(propProvider)(Event);