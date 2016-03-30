import React, { Component, PropTypes } from 'react';
import { getImageUrl, formatDate } from '../../utils/helpers';
import Rating from '../rating';

export default class EventRequestItem extends Component {

   render() {
      let { eventRequest } = this.props;
      let { user, created } = eventRequest;
      let { id, externalId, firstName, lastName, rating } = user;
      let imageUrl = getImageUrl(externalId, 'square');
      let date = formatDate(created, 'lll');

      return (
         <div className="panel panel-default">
            <div className="panel-body">
               <img src={imageUrl} class="img-circle" />
               <Link to={'/user/profile/' + {id}}>{firstName} {lastName}</Link>
               <div className="pull-right">
                  <Rating rating={rating} />
                  <a href="#" class="text-success" onClick={this.onAcceptClick}><i class="fa fa-2x fa-check-circle-o"></i></a>
                  <a href="#" class="text-danger" onClick={this.onDeclineClick}><i class="fa fa-2x fa-times-circle-o"></i></a>
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