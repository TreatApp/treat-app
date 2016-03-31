import React, { Component, PropTypes } from 'react';
import { getImageUrl, formatDate } from '../../utils/helpers';
import { Link } from 'react-router';
import Rating from '../rating';

export default class EventRequestItem extends Component {

   render() {
      let { eventRequest } = this.props;
      let { user } = eventRequest;
      let { id, externalId, firstName, lastName, rating } = user;
      let imageUrl = getImageUrl(externalId, 'square');

      return (
         <div className="panel panel-default">
            <div className="panel-body">
               <img src={imageUrl} className="img-circle" />
               <Link to={'/profile/' + id}>{firstName} {lastName}</Link>
               <div className="pull-right">
                  <Rating rating={rating} />
                  <a href="#" className="text-success" onClick={this.onAcceptClick}><i className="fa fa-2x fa-check-circle-o"></i></a>
                  <a href="#" className="text-danger" onClick={this.onDeclineClick}><i className="fa fa-2x fa-times-circle-o"></i></a>
               </div>
            </div>
         </div>
      );
   }

   onAcceptClick = ev => {
      ev.preventDefault();
      this.props.onRequestAccept(this.props.eventRequest);
   };

   onDeclineClick = ev => {
      ev.preventDefault();
      this.props.onRequestDecline(this.props.eventRequest);
   };
}

EventRequestItem.propTypes = {
   eventRequest: PropTypes.object.isRequired,
   onRequestAccept: PropTypes.func.isRequired,
   onRequestDecline: PropTypes.func.isRequired
};