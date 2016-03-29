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
         <div className="navbar navbar-default navbar-fixed-top">
            {this.props.leftControl ? this.renderLeftControl() : null}
            {this.props.rightControl ? this.renderRightControl() : null}
         </div>
      );
   }

   renderLeftControl() {
      return (
         <ul className="nav navbar-nav">
            <li>{this.props.leftControl}</li>
         </ul>
      );
   }

   renderRightControl() {
      return (
         <ul className="nav navbar-nav navbar-right">
            <li>{this.props.rightControl}</li>
         </ul>
      );
   }
}

Head.propTypes = {
};