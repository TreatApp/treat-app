import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { logout } from '../../actions';
import Profile from './profile';
import BankAccount from './bank-account';
import CreditCard from './credit-card';

class User extends Component {

   constructor(props) {
      super(props);

      this.state = this.makeInitialState(props);
   }

   makeInitialState(props) {
      return {
         viewMode: User.viewMode.menu
      };
   }

   render() {
      let { userState } = this.props;
      let { profile } = userState.toJS();

      switch(this.state.viewMode) {
         case User.viewMode.profile:
            return <Profile dispatch={this.props.dispatch} profile={profile} />;

         case User.viewMode.bankAccount:
            return <BankAccount />;

         case User.viewMode.creditCard:
            return <CreditCard />;

         default:
            return this.renderMenu();
      }
   }

   renderMenu() {
      return (
         <div>
            <div className="list-group">
               <a href="#" className="list-group-item" onClick={this.showProfile}>Profile</a>
               <a href="#" className="list-group-item" onClick={this.showBankAccount}>Bank account</a>
               <a href="#" className="list-group-item" onClick={this.showCreditCard}>Credit card</a>
            </div><br />
            <button className="btn btn-block btn-primary js-logout" onClick={this.logout}>Log out</button>
         </div>
      );
   }

   showProfile = ev => {
      ev.preventDefault();
      this.setState({ viewMode: User.viewMode.profile });
   };

   showBankAccount = ev => {
      ev.preventDefault();
      this.setState({ viewMode: User.viewMode.bankAccount });
   };

   showCreditCard = ev => {
      ev.preventDefault();
      this.setState({ viewMode: User.viewMode.creditCard });
   };

   logout = ev => {
      ev.preventDefault();
      const {dispatch} = this.props;
      dispatch(logout());
   };
}

User.viewMode = { menu: 0, profile: 1, bankAccount: 2, creditCard: 3 };

User.propTypes = {
   dispatch: PropTypes.func.isRequired,
   appState: PropTypes.object.isRequired,
   userState: PropTypes.object.isRequired
};

function propProvider(reduxState, props) {
   const {appState, userState} = reduxState;

   return {
      appState,
      userState
   };
}

export default connect(propProvider)(User);