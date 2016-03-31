import React, { Component, PropTypes } from 'react';
import Event from './event';

export default class List extends Component {

   render() {
      let { events } = this.props;

      return (
         <div>
            {events.map(event => {
               return <Event key={event.id} event={event} />;
            })}
         </div>
      );
   }
}

List.propTypes = {
   events: PropTypes.array.isRequired
};