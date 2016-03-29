import React, { Component, PropTypes } from 'react';

export default class Back extends Component {

   constructor(props) {
      super(props);

      console.log('initibl back');

      this.state = this.makeInitialState(props);
   }

   makeInitialState(props) {
      return {
      };
   }

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

Back.contextTypes = {
   router: PropTypes.object.isRequired
};

Back.propTypes = {
};