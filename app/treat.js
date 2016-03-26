import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router, Route, IndexRedirect, IndexRoute, hashHistory } from 'react-router'
import configureStore from './configure-store';
import Root from './components/root';
import Guest from './components/guest';
import Host from './components/host';
import User from './components/user';
import Profile from './components/user/profile';
import EditProfile from './components/user/edit-profile';
import BankAccount from './components/user/bank-account';
import CreditCard from './components/user/credit-card';
import Event from './components/event';
import CreateEvent from './components/create-event';

window.isPhone = (window.location.protocol === 'file:');

document.addEventListener(window.isPhone ? 'deviceready' : 'DOMContentLoaded', () => {
   ReactDOM.render(
      <Provider store={configureStore()}>
         <Router history={hashHistory}>
            <Route path="/" component={Root}>
               <IndexRedirect to="guest" />
               <Route path="guest" component={Guest} />
               <Route path="host" component={Host} />
               <Route path="user">
                  <IndexRoute component={User} />
                  <Route path="profile" component={Profile} />
                  <Route path="edit" component={EditProfile} />
                  <Route path="bank-account" component={BankAccount} />
                  <Route path="credit-card" component={CreditCard} />
               </Route>
               <Route path="event/create" component={CreateEvent} />
               <Route path="event/:id" component={Event} />
               <Route path="profile/:id" component={Profile} />
            </Route>
         </Router>
      </Provider>,
      document.getElementById('treat-root')
   );
});