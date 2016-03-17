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
      return (
         <div>
            List
         </div>
      );
   }
}

List.propTypes = {
};