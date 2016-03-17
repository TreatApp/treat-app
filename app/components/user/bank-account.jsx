import React, { Component, PropTypes } from 'react';

export default class BankAccount extends Component {

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
            BankAccount
         </div>
      );
   }
}

BankAccount.propTypes = {
};