import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router, Route, IndexRedirect, hashHistory } from 'react-router'
import configureStore from './configure-store';
import Root from './components/root';
import Guest from './components/guest';
import Host from './components/host';
import User from './components/user';
import Event from './components/event';

window.isPhone = (window.location.protocol === 'file:');

document.addEventListener(window.isPhone ? 'deviceready' : 'DOMContentLoaded', () => {
   ReactDOM.render(
      <Provider store={configureStore()}>
         <Router history={hashHistory}>
            <Route path="/" component={Root}>
               <IndexRedirect to="/guest" />
               <Route path="/host" component={Host} />
               <Route path="/user" component={User} />
               <Route path="/guest" component={Guest} />
               <Route path="/event/:id" component={Event} />
            </Route>
         </Router>
      </Provider>,
      document.getElementById('treat-root')
   );
});