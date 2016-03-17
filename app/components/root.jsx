import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { initAuth, authenticate } from '../actions';
import Progress from './progress';
import Error from './error';
import Login from './login';
import Head from './head';
import Nav from './nav';

class Root extends Component {

   componentWillMount() {
      const {dispatch} = this.props;
      dispatch(initAuth());
   }

   onLogin = ev => {
      const {dispatch} = this.props;
      dispatch(authenticate());
   }

   render() {

      const { appState } = this.props;
      const { authenticated, networkProgress, networkFailed } = appState.toJS();

      return (
         <div>
            {networkProgress ? <Progress /> : null}
            {networkFailed ? <Error /> : null}
            {authenticated ? this.renderContent() : <Login onLogin={this.onLogin} />}
         </div>
      );
   }

   renderContent() {
      return (
         <div>
            <Head />
            <div className="container">
               {this.props.children}
            </div>
            <Nav />
         </div>
      );
   }
}

Root.propTypes = {
   dispatch: PropTypes.func.isRequired,
   appState: PropTypes.object.isRequired
};

function propProvider(reduxState, props) {
   const {appState} = reduxState;

   return {
      appState
   };
}

export default connect(propProvider)(Root);