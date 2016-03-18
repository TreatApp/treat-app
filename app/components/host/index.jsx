import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Event from './event';
import { getUserEvents } from './actions';

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
      dispatch(getUserEvents());
   }

   render() {
      let { userEventsState } = this.props;
      let { events } = userEventsState.toJS();

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