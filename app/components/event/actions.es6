import 'whatwg-fetch';
import { fetchGet, checkStatus, prefixUrl, logError} from '../../utils/network';
import { networkProgress, networkFailed, resetNetwork } from '../../actions';

export const GET_EVENT_LOGS = 'GET_EVENT_LOGS';
export const GET_EVENT_REQUESTS = 'GET_EVENT_REQUESTS';
export const ADD_EVENT_LOG = 'ADD_EVENT_LOG';
export const ADD_EVENT_REQUEST = 'ADD_EVENT_REQUEST';
export const UPDATE_EVENT_REQUEST = 'UPDATE_EVENT_REQUEST';
export const SAVE_EVENT_RATING = 'SAVE_EVENT_RATING';
export const SAVE_USER_RATING = 'SAVE_USER_RATING';

function getEventLogsSuccess(json) {
   return {
      type: GET_EVENT_LOGS,
      state: {
         logs: json
      }
   };
}

function getEventRequestsSuccess(json) {
   return {
      type: GET_EVENT_REQUESTS,
      state: {
         requests: json
      }
   };
}

function addEventLogSuccess(json) {
   return {
      type: ADD_EVENT_LOG,
      state: {
         log: json
      }
   };
}

function addEventRequestSuccess(json) {
   return {
      type: ADD_EVENT_REQUEST,
      state: {
         request: json
      }
   };
}

function updateEventRequestSuccess(json) {
   return {
      type: UPDATE_EVENT_REQUEST,
      state: {
         request: json
      }
   };
}

function saveEventRatingSuccess(json) {
   return {
      type: SAVE_EVENT_RATING,
      state: {
         rating: json
      }
   };
}

function saveUserRatingSuccess(json) {
   return {
      type: SAVE_USER_RATING,
      state: {
         rating: json
      }
   };
}

export function getEventLogs() {
   const url = prefixUrl('/eventLogs');
   return dispatch => {
      return fetch(url, fetchGet())
         .then(checkStatus)
         .then(res => res.json())
         .then(json => {
            dispatch(getEventLogsSuccess(json));
            dispatch(resetNetwork());
         })
         .catch(error => {
            logError(error);
            dispatch(networkFailed());
         });
   };
}

export function getEventRequests() {
   const url = prefixUrl('/eventRequests');
   return dispatch => {
      dispatch(networkProgress());
      return fetch(url, fetchGet())
         .then(checkStatus)
         .then(json => {
            dispatch(getEventRequestsSuccess(json));
            dispatch(resetNetwork());
         })
         .catch(error => {
            logError(error);
            dispatch(networkFailed());
         });
   };
}

export function addEventLog(log) {
   const url = prefixUrl('/eventLogs');
   return dispatch => {
      dispatch(networkProgress());
      return fetch(url, fetchPost(log))
         .then(checkStatus)
         .then(json => {
            dispatch(addEventLogSuccess(json));
            dispatch(resetNetwork());
         })
         .catch(error => {
            logError(error);
            dispatch(networkFailed());
         });
   };
}

export function addEventRequest(request) {
   const url = prefixUrl('/eventRequests');
   return dispatch => {
      dispatch(networkProgress());
      return fetch(url, fetchPost(request))
         .then(checkStatus)
         .then(json => {
            dispatch(addEventRequestSuccess(json));
            dispatch(resetNetwork());
         })
         .catch(error => {
            logError(error);
            dispatch(networkFailed());
         });
   };
}

export function updateEventRequest(request) {
   const url = prefixUrl('/eventRequests');
   return dispatch => {
      dispatch(networkProgress());
      return fetch(url, fetchPut(request))
         .then(checkStatus)
         .then(json => {
            dispatch(updateEventRequestSuccess(json));
            dispatch(resetNetwork());
         })
         .catch(error => {
            logError(error);
            dispatch(networkFailed());
         });
   };
}

export function saveEventRating(rating) {
   const url = prefixUrl('/eventRatings');
   return dispatch => {
      dispatch(networkProgress());
      return fetch(url, fetchPost(rating))
         .then(checkStatus)
         .then(json => {
            dispatch(saveEventRatingSuccess(json));
            dispatch(resetNetwork());
         })
         .catch(error => {
            logError(error);
            dispatch(networkFailed());
         });
   };
}

export function saveUserRating(rating) {
   const url = prefixUrl('/userRatings');
   return dispatch => {
      dispatch(networkProgress());
      return fetch(url, fetchPost(rating))
         .then(checkStatus)
         .then(json => {
            dispatch(saveUserRatingSuccess(json));
            dispatch(resetNetwork());
         })
         .catch(error => {
            logError(error);
            dispatch(networkFailed());
         });
   };
}