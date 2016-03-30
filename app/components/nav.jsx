import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router'

export default class Nav extends Component {

   render() {
      return (
         <div className="navbar navbar-inverse navbar-fixed-bottom">
            <ul className="nav navbar-nav navbar-justified">
               <li className={this.activeClass("guest")}><Link to="/guest"><i className="fa fa-2x fa-cutlery"></i></Link></li>
               <li className={this.activeClass("host")}><Link to="/host"><i className="fa fa-2x fa-home"></i></Link></li>
               <li className={this.activeClass("user")}><Link to="/user"><i className="fa fa-2x fa-user"></i></Link></li>
            </ul>
         </div>
      );
   }

   activeClass(route) {
      return this.context.router.isActive(route) ? 'active' : null;
   }
}

Nav.contextTypes = {
   router: PropTypes.object.isRequired
};
