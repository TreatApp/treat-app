import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { getBlobUrl, getImageUrl, formatDate } from '../../utils/helpers';
import Rating from '../rating';

class CreateEvent extends Component {

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

      let event = events.find(e => { return e.id == eventId; });

      let { user, slotsAvailable, slots, location, title, categories, start, end, description, price, eventImages } = event;
      let { externalId, rating, firstName, lastName } = user;

      let imageUrl = getImageUrl(externalId, 'square');
      let backgroundUrl = 'url(' + getBlobUrl(eventImages) + ')';

      return (
         <div className="text-center">
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
               <a href="/user/profile/{{user.id}}">{firstName} {lastName}</a><br />
               <Rating rating={rating || 0} />
            </div>
            <hr />
            <p className="text-left">{description}</p>
            <hr />
            <br /><br />
            <button className="btn btn-primary btn-block">Send request</button>
         </div>
      );
   }
}

CreateEvent.propTypes = {
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

export default connect(propProvider)(CreateEvent);