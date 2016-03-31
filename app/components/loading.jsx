import React, { Component, PropTypes } from 'react';
import Spinner from 'spin.js';

export default class Loading extends Component {

   render() {
      return (
         <div className="loading"></div>
      );
   }

   componentDidMount() {
      if(!this.spinner) {
         this.spinner = new Spinner({
            lines: 10,
            length: 6,
            width: 3,
            radius: 6,
            corners: 1,
            direction: 1,
            color: '#999'
         });
         this.spinner.spin(document.getElementsByClassName('loading')[0]);
      }
   }

   componentWillUnmount() {
      if(this.spinner) {
         this.spinner.stop();
         this.spinner = null;
      }
   }
}