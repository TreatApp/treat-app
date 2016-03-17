import React, { Component, PropTypes } from 'react';

export default class Head extends Component {

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
         <div className="navbar navbar-default navbar-fixed-top"></div>
      );
   }
}

Head.propTypes = {
};