import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router, Route, IndexRedirect, IndexRoute, hashHistory } from 'react-router'
import configureStore from './configure-store';

import Root from './components/root';
import Guest from './components/guest';
import Host from './components/host';
import User from './components/user';
import Nav from './components/nav';
import BackButton from './components/head/back-button';
import CreateEventButton from './components/head/create-event-button';

import Profile from './components/user/profile';
import EditProfile from './components/user/edit-profile';
import BankAccount from './components/user/bank-account';
import EditBankAccount from './components/user/edit-bank-account';
import CreditCard from './components/user/credit-card';
import EditCreditCard from './components/user/edit-credit-card';

import Event from './components/event';
import CreateEvent from './components/host/create-event';

window.isPhone = (window.location.protocol === 'file:');

document.addEventListener(window.isPhone ? 'deviceready' : 'DOMContentLoaded', () => {
   ReactDOM.render(
      <Provider store={configureStore()}>
         <Router history={hashHistory}>
            <Route path="/" component={Root}>
               <IndexRedirect to="guest" />
               <Route path="guest" components={{content: Guest, nav: Nav}} />
               <Route path="host" components={{content: Host, nav: Nav, rightControl: CreateEventButton}} />
               <Route path="user">
                  <IndexRoute components={{content: User, nav: Nav}} />
                  <Route path="profile">
                     <IndexRoute components={{content: Profile, nav: Nav, leftControl: BackButton}} />
                     <Route path="edit" components={{content: EditProfile, nav: Nav, leftControl: BackButton}} />
                  </Route>
                  <Route path="bank-account">
                     <IndexRoute components={{content: BankAccount, nav: Nav, leftControl: BackButton}} />
                     <Route path="edit" components={{content: EditBankAccount, nav: Nav, leftControl: BackButton}} />
                  </Route>
                  <Route path="credit-card">
                     <IndexRoute components={{content: CreditCard, nav: Nav, leftControl: BackButton}} />
                     <Route path="edit" components={{content: EditCreditCard, nav: Nav, leftControl: BackButton}} />
                  </Route>
               </Route>
               <Route path="event/create" components={{content: CreateEvent, leftControl: BackButton}} />
               <Route path="event/:id" components={{content: Event, leftControl: BackButton}} />
               <Route path="profile/:id" components={{content: Profile, leftControl: BackButton}} />
            </Route>
         </Router>
      </Provider>,
      document.getElementById('treat-root')
   );
});