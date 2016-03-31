import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Event from './event';
import { getUserEvents } from './actions';

class Host extends Component {

   componentWillMount() {
      const {dispatch} = this.props;
      dispatch(getUserEvents());
   }

   render() {
      let { userEventsState } = this.props;
      let { events } = userEventsState.toJS();

      return (
         <div className="container">
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
   userEventsState: PropTypes.object.isRequired
};

function propProvider(reduxState, props) {
   const {appState, userEventsState} = reduxState;

   return {
      appState,
      userEventsState
   };
}

export default connect(propProvider)(Host);