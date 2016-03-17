import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router'

export default class Nav extends Component {

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
         <nav className="navbar navbar-inverse navbar-fixed-bottom">
            <ul className="nav navbar-nav navbar-justified">
               <li><Link to="/guest"><i className="fa fa-2x fa-cutlery"></i></Link></li>
               <li><Link to="/host"><i className="fa fa-2x fa-home"></i></Link></li>
               <li><Link to="/user"><i className="fa fa-2x fa-user"></i></Link></li>
            </ul>
         </nav>
      );
   }
}

Nav.propTypes = {
};