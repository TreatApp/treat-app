import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Progress from './progress';
import Error from './error';
import Head from './head';
import Nav from './nav';

class Root extends Component {

   render() {

      const { appState } = this.props;
      const { networkProgress, networkFailed } = appState.toJS();

      return (
         <div>
            {networkProgress ? <Progress /> : null}
            {networkFailed ? <Error /> : null}
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