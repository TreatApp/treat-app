import React, { Component, PropTypes } from 'react';

export default class Error extends Component {

   constructor(props) {
      super(props);

      this.state = this.makeInitialState(props);
   }

   makeInitialState(props) {
      return {
         showError: true
      };
   }

   componentDidMount() {
      let that = this;
      setTimeout(function() {
         that.setState({ showError: false });
      }, 3000);
   }

   render() {
      return this.state.showError ? (
         <div className="error">Ett oväntat fel uppstod</div>
      ) : null;
   }
}