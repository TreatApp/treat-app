import React, { Component } from 'react';
import { Link } from 'react-router';

export default class CreateEventButton extends Component {

   render() {
      return (
         <Link to="/event/create"><i className="fa fa-lg fa-plus"></i></Link>
      );
   }
}