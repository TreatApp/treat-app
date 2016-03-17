import React, { Component, PropTypes } from 'react';

export default class CreditCard extends Component {

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
            CreditCard
         </div>
      );
   }
}

CreditCard.propTypes = {
};