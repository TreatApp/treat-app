import React, { Component, PropTypes } from 'react';

export default class List extends Component {

   constructor(props) {
      super(props);

      this.state = this.makeInitialState(props);
   }

   makeInitialState(props) {
      return {
      };
   }

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