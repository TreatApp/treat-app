import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router, Route, IndexRedirect, browserHistory } from 'react-router'
import configureStore from './configure-store';
import Root from './components/root';
import Guest from './components/guest';
import Host from './components/host';
import User from './components/user';
import Event from './components/event';

const store = configureStore();

document.addEventListener('DOMContentLoaded', () => {

   window.isPhone = (document.URL.indexOf("http://") === -1 && document.URL.indexOf("https://") === -1);

   ReactDOM.render(
       <Provider store={store}>
           <Router history={browserHistory}>
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
