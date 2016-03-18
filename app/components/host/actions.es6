import 'whatwg-fetch';
import { fetchGet, checkStatus, prefixUrl, logError} from '../../utils/network';
import { networkFailed, resetNetwork } from '../../actions';

export const GET_USER_EVENTS = 'GET_USER_EVENTS';
export const ADD_EVENT = 'ADD_EVENT';
export const EDIT_EVENT = 'EDIT_EVENT';

function getUserEventsSuccess(json) {
   return {
      type: GET_USER_EVENTS,
      state: {
         events: json
      }
   };
}

function addEventSuccess(json) {
   return {
      type: ADD_EVENT,
      state: {
         event: json
      }
   };
}

function saveEventSuccess(json) {
   return {
      type: EDIT_EVENT,
      state: {
         event: json
      }
   };
}

export function getUserEvents() {
   const url = prefixUrl('/userEvents');
   return dispatch => {
      return fetch(url, fetchGet())
         .then(checkStatus)
         .then(res => res.json())
         .then(json => {
            dispatch(getUserEventsSuccess(json));
            dispatch(resetNetwork());
         })
         .catch(error => {
            logError(error);
            dispatch(networkFailed());
         });
   };
}

export function addEvent(event) {
   const url = prefixUrl('/events');
   return dispatch => {
      dispatch(networkProgress());
      return fetch(url, fetchPost(event))
         .then(checkStatus)
         .then(json => {
            dispatch(addEventSuccess(json));
            dispatch(resetNetwork());
         })
         .catch(error => {
            logError(error);
            dispatch(networkFailed());
         });
   };
}

export function saveEvent(event) {
   const url = prefixUrl('/events');
   return dispatch => {
      dispatch(networkProgress());
      return fetch(url, fetchPut(event))
         .then(checkStatus)
         .then(json => {
            dispatch(saveEventSuccess(json));
            dispatch(resetNetwork());
         })
         .catch(error => {
            logError(error);
            dispatch(networkFailed());
         });
   };
}