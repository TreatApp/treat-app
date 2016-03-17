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
            <ul className="nav navbar-nav">
               <li><a href="javascript:history.go(-1);"><i className="fa fa-2x fa-chevron-left"></i></a></li>
            </ul>
            <ul className="nav navbar-nav navbar-right">
               <li><a href="javascript:;"><i className="fa fa-2x fa-save"></i></a></li>
            </ul>
         </div>
      );
   }
}

Head.propTypes = {
};