import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

class EditCreditCard extends Component {

   constructor(props) {
      super(props);

      this.state = this.makeInitialState(props);
   }

   makeInitialState(props) {
      return {
      };
   }

   render() {
      return (
         <div>
            Edit Credit Card
         </div>
      );
   }
}

EditCreditCard.propTypes = {
   dispatch: PropTypes.func.isRequired,
   userState: PropTypes.object.isRequired
};

function propProvider(reduxState, props) {
   const {userState} = reduxState;

   return {
      userState
   };
}

export default connect(propProvider)(EditCreditCard);
