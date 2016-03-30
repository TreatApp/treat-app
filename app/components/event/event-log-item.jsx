import React, { Component, PropTypes } from 'react';
import { getImageUrl, formatDate } from '../../utils/helpers';

export default class EventLogItem extends Component {

   render() {
      let { eventLog } = this.props;
      let { user, created, text } = eventLog;
      let { externalId, firstName } = user;
      let imageUrl = getImageUrl(externalId, 'square');
      let date = formatDate(created, 'lll');

      return (
         <div>
            <p className="pull-left">
               <img src={imageUrl} className="img-circle" />
            </p>
            <p>{text}</p>
            <p className="text-muted small">
               <em>{firstName}, {date}</em>
            </p>
            <hr />
         </div>
      );
   }
}

EventLogItem.propTypes = {
   eventLog: PropTypes.object.isRequired
};