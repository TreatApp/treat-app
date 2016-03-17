import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router'
import { logout } from '../../actions';


class User extends Component {

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
         <div>
            <div className="list-group">
               <Link to="/user/profile" className="list-group-item">Profile</Link>
               <Link to="/user/bank-account" className="list-group-item">Bank account</Link>
               <Link to="/user/credit-card" className="list-group-item">Credit card</Link>
            </div><br />
            <button className="btn btn-block btn-primary js-logout" onClick={this.logout}>Log out</button>
         </div>
      );
   }

   logout = ev => {
      ev.preventDefault();
      const {dispatch} = this.props;
      dispatch(logout());
   };
}

User.propTypes = {
   dispatch: PropTypes.func.isRequired,
   appState: PropTypes.object.isRequired
};

function propProvider(reduxState, props) {
   const {appState} = reduxState;

   return {
      appState
   };
}

export default connect(propProvider)(User);