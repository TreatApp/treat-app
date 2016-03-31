import React, { Component, PropTypes } from 'react';

export default class BackButton extends Component {

   goBack = ev => {
      ev.preventDefault();
      this.context.router.goBack();
   };

   render() {
      return (
         <a href="#" onClick={this.goBack}><i className="fa fa-lg fa-chevron-left"></i></a>
      );
   }
}

BackButton.contextTypes = {
   router: PropTypes.object.isRequired
};
