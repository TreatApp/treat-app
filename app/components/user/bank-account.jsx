import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

class BankAccount extends Component {

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
         <div className="list-group">
            <Link to="/user/bank-account/edit" className="list-group-item">
               <i className="fa fa-chevron-right navigate-two-rows"></i>
               <strong>Test Bank</strong><br />
               <span>1234-5 123 456 789</span>
            </Link>
         </div>
      );
   }
}

BankAccount.propTypes = {
   dispatch: PropTypes.func.isRequired,
   userState: PropTypes.object.isRequired
};

function propProvider(reduxState, props) {
   const {userState} = reduxState;

   return {
      userState
   };
}

export default connect(propProvider)(BankAccount);