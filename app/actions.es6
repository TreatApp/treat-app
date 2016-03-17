import 'whatwg-fetch';
import { browserHistory } from 'react-router';
import { fetchPost, checkStatus, prefixUrl, logError} from 'utils/network';
import {saveToken, getToken} from './utils/auth';

export const NETWORK = 'NETWORK';
export const AUTHENTICATION = 'AUTHENTICATION';

export function networkProgress() {
   return {
      type: NETWORK,
      state: {
         networkProgress: true,
         networkFailed: false
      }
   };
}

export function networkFailed() {
   return {
      type: NETWORK,
      state: {
         networkProgress: false,
         networkFailed: true
      }
   };
}

export function resetNetwork() {
   return {
      type: NETWORK,
      state: {
         networkProgress: false,
         networkFailed: false
      }
   };
}

function authenticated(state) {
   return {
      type: AUTHENTICATION,
      state: {
         authenticated: state
      }
   };
}

export function initAuth() {
   return dispatch => {
      if (!window.isPhone) {
         window.fbAsyncInit = function () {
            facebookConnectPlugin.browserInit('155506791476444');

            if (getToken()) {
               dispatch(checkAuth());
            }
         };
      }
      else {
         if (getToken()) {
            dispatch(checkAuth());
         }
      }
   }
}

function checkAuth() {
   return dispatch => {
      dispatch(networkProgress());
      facebookConnectPlugin.getLoginStatus(
         function (response) {
            if (response.status === 'connected') {
               saveToken(response.authResponse);
               dispatch(authenticated(true));
               dispatch(resetNetwork());
            }
            else {
               dispatch(resetNetwork());
            }
         },
         function (response) {
            console.log('Error', response);
            dispatch(resetNetwork());
         }
      );
   }
}

export function authenticate() {
   return dispatch => {
      dispatch(networkProgress());
      facebookConnectPlugin.login(
         ['public_profile', 'email'],
         function (response) {
            if (response.status === 'connected') {
               saveToken(response.authResponse);
               dispatch(getInfo());
            }
            else {
               dispatch(resetNetwork());
            }
         },
         function (response) {
            alert('Login error: ' + response);
            dispatch(resetNetwork());
         }
      );
   }
}

function getInfo() {
   return dispatch => {
      facebookConnectPlugin.api('/me?fields=first_name,last_name,email',
         null,
         function (response) {
            dispatch(serverLogin(response));
         },
         function (response) {
            alert('Get info error: ' + response);
         }
      );
   }
}

function serverLogin(data) {
   const url = prefixUrl('/auth');
   const user = {
      externalId: data.id,
      firstName: data.first_name,
      lastName: data.last_name,
      email: data.email
   };
   return dispatch => {
      return fetch(url, fetchPost(user))
         .then(checkStatus)
         .then(res => {
            dispatch(authenticated(true));
            dispatch(resetNetwork())
         })
         .catch(error => {
            logError(error);
            dispatch(networkFailed());
         });
   };
}

export function logout() {
   return dispatch => {
      facebookConnectPlugin.logout(
         function (response) {
            dispatch(authenticated(false));
            browserHistory.push('/');
         },
         function (response) {
            alert('Logout error: ' + response);
         }
      );
   }
}