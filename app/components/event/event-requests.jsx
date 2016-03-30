import React, { Component, PropTypes } from 'react';
import EventRequestItem from './event-request-item';

export default class EventRequests extends Component {

   constructor(props) {
      super(props);

      this.state = this.makeInitialState(props);
   }

   makeInitialState(props) {
      return {
      };
   }

   render() {
      let { eventRequests, onRequestAccept, onRequestDecline } = this.props;

      return (
         <div>
            {eventRequests.map(eventRequest => {
               return <EventRequestItem key={eventRequest.user.id} eventRequest={eventRequest}
                                        onRequestAccept={onRequestAccept} onRequestDecline={onRequestDecline} />;
            })}
         </div>
      );
   }
}

EventRequests.propTypes = {
   eventRequests: PropTypes.array.isRequired,
   onRequestAccept: PropTypes.func.isRequired,
   onRequestDecline: PropTypes.func.isRequired
};