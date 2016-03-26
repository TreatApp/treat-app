import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

class EditBankAccount extends Component {

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
         <form>
            <div className="form-group">
               <input type="text" name="name" className="form-control" placeholder="Bank name" />
            </div>
            <div className="form-group">
               <input type="text" name="number" className="form-control" placeholder="Account number" />
            </div>
         </form>
      );
   }
}

EditBankAccount.propTypes = {
   dispatch: PropTypes.func.isRequired,
   userState: PropTypes.object.isRequired
};

function propProvider(reduxState, props) {
   const {userState} = reduxState;

   return {
      userState
   };
}

export default connect(propProvider)(EditBankAccount);