import React, { Component, PropTypes } from 'react';

export default class Login extends Component {

   render() {
      return (
         <div className="login">
            <p>
               <img src="img/logo.png" />
            </p>
            <p>
               <button className="btn btn-primary btn-lg" onClick={this.login}><i className="fa fa-facebook-square"></i> Log in with Facebook</button>
            </p>
         </div>
      );
   }

   login = ev => {
      ev.preventDefault();
      this.props.onLogin();
   };
}

Login.propTypes = {
   onLogin: PropTypes.func.isRequired
};