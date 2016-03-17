import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Event from './event';
import { getMyEvents } from './actions';

class Host extends Component {

   constructor(props) {
      super(props);

      this.state = this.makeInitialState(props);
   }

   makeInitialState(props) {
      return {
      };
   }

   componentWillMount() {
      const {dispatch} = this.props;
      dispatch(getMyEvents());
   }

   render() {
      let { myEventsState } = this.props;
      let { events } = myEventsState.toJS();

      return (
         <div>
            {events.map(event => {
               return <Event key={event.id} event={event} />;
            })}
         </div>
      );
   }
}

Host.propTypes = {
   dispatch: PropTypes.func.isRequired,
   appState: PropTypes.object.isRequired,
   myEventsState: PropTypes.object.isRequired
};

function propProvider(reduxState, props) {
   const {appState, myEventsState} = reduxState;

   return {
      appState,
      myEventsState
   };
}

export default connect(propProvider)(Host);