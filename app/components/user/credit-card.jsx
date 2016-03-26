import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

class CreditCard extends Component {

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
            <Link to="/user/credit-card/edit" className="list-group-item">
               <strong>VISA</strong><br />
               <span>**** **** **** 1234</span>
            </Link>
         </div>
      );
   }
}

CreditCard.propTypes = {
   dispatch: PropTypes.func.isRequired,
   userState: PropTypes.object.isRequired
};

function propProvider(reduxState, props) {
   const {userState} = reduxState;

   return {
      userState
   };
}

export default connect(propProvider)(CreditCard);
