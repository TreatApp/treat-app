import React, { Component, PropTypes } from 'react';

export default class Head extends Component {

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
