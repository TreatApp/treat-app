import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { getBlobUrl, getImageUrl, formatDate } from '../../utils/helpers';
import { getEventLogs, getEventRequests, addEventLog, addEventRequest, updateEventRequest } from './actions';
import Rating from '../rating';
import EventLog from './event-log';
import EventRequests from './event-requests';

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

   componentWillMount() {
      let { dispatch } = this.props;
      let { eventId } = this.state;

      dispatch(getEventLogs(eventId));
      dispatch(getEventRequests(eventId));
   }

   render() {
      let { eventId } = this.state;
      let { eventState, eventsState, userEventsState } = this.props;
      let { eventLogs, eventRequests } = eventState.toJS();
      let { events } = eventsState.merge(userEventsState).toJS();
      let event = events.find(e => { return e.id == eventId; });

      let { user, slotsAvailable, slots, location, title, categories, start, end, description, price, eventImages } = event;
      let { id, externalId, rating, firstName, lastName } = user;

      let imageUrl = getImageUrl(externalId, 'square');
      let backgroundUrl = 'url(' + getBlobUrl(eventImages) + ')';

      return (
         <div className="container text-center">
            <div style={{background: backgroundUrl, backgroundSize: '100%', height: 100}}></div>
            <h3>{title}</h3>
            <p>
               {categories.map(category => {
                  return <em key={category.id}>{category.name}</em>;
               })}
            </p>
            <hr />
            <div className="row">
               <div className="col-xs-4">
                  <i className="fa fa-2x fa-clock-o"></i><br />
                  <strong>{formatDate(start, 'll')}</strong><br />
                  {formatDate(start, 'LT')} - {formatDate(end, 'LT')}
               </div>
               <div className="col-xs-4">
                  <i className="fa fa-2x fa-user"></i><br />
                  <strong>{slots} seats</strong><br />
                  {slotsAvailable} available
               </div>
               <div className="col-xs-4">
                  <i className="fa fa-2x fa-money"></i><br />
                  {price} SEK<br />
                  (VAT incl.)
               </div>
            </div>
            <hr />
            <div>
               <img src={imageUrl} className="img-circle" /><br />
               Hosted by<br />
               <Link to={"/profile/" + id}>{firstName} {lastName}</Link><br />
               <Rating rating={rating || 0} />
            </div>
            <hr />
            <p className="text-left">{description}</p>
            <hr />
            <br /><br />
            <button className="btn btn-primary btn-block" onClick={this.onSendRequest}>Send request</button>

            <EventLog eventLogs={eventLogs} onSaveEventLog={this.onSaveEventLog} />
            <EventRequests eventRequests={eventRequests} onRequestAccept={this.onRequestAccept} onRequestDecline={this.onRequestDecline} />
         </div>
      );
   }

   onSendRequest = ev => {
      ev.preventDefault();
      let { dispatch } = this.props;
      dispatch(addEventRequest({
         eventId: this.state.eventId
      }));
   };

   onSaveEventLog(eventLog) {
      console.log('save event log', eventLog, this.props);
      let { dispatch } = this.props;
      dispatch(addEventLog(eventLog));
   }

   onRequestAccept(eventRequest) {
      let { dispatch } = this.props;
      dispatch(addEventRequest(eventRequest));
   }

   onRequestDecline(eventRequest) {
      let { dispatch } = this.props;
      dispatch(updateEventRequest(eventRequest));
   }
}

Event.propTypes = {
   dispatch: PropTypes.func.isRequired,
   appState: PropTypes.object.isRequired,
   eventsState: PropTypes.object.isRequired,
   userEventsState: PropTypes.object.isRequired
};

function propProvider(reduxState, props) {
   const {appState, eventState, eventsState, userEventsState} = reduxState;

   return {
      appState,
      eventState,
      eventsState,
      userEventsState
   };
}

export default connect(propProvider)(Event);