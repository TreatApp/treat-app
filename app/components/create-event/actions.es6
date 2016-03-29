import { getJson, putJson, postJson, checkStatus, logError} from '../../utils/network';
import { networkProgress, networkFailed, resetNetwork } from '../../actions';

export const GET_EVENT_LOGS = 'GET_EVENT_LOGS';
export const GET_EVENT_REQUESTS = 'GET_EVENT_REQUESTS';
export const ADD_EVENT_LOG = 'ADD_EVENT_LOG';
export const ADD_EVENT_REQUEST = 'ADD_EVENT_REQUEST';
export const UPDATE_EVENT_REQUEST = 'UPDATE_EVENT_REQUEST';
export const SAVE_EVENT_RATING = 'SAVE_EVENT_RATING';
export const SAVE_USER_RATING = 'SAVE_USER_RATING';

function getEventLogsSuccess(data) {
   return {
      type: GET_EVENT_LOGS,
      state: {
         logs: data
      }
   };
}

function getEventRequestsSuccess(data) {
   return {
      type: GET_EVENT_REQUESTS,
      state: {
         requests: data
      }
   };
}

function addEventLogSuccess(data) {
   return {
      type: ADD_EVENT_LOG,
      state: {
         log: data
      }
   };
}

function addEventRequestSuccess(data) {
   return {
      type: ADD_EVENT_REQUEST,
      state: {
         request: data
      }
   };
}

function updateEventRequestSuccess(data) {
   return {
      type: UPDATE_EVENT_REQUEST,
      state: {
         request: data
      }
   };
}

function saveEventRatingSuccess(data) {
   return {
      type: SAVE_EVENT_RATING,
      state: {
         rating: data
      }
   };
}

function saveUserRatingSuccess(data) {
   return {
      type: SAVE_USER_RATING,
      state: {
         rating: data
      }
   };
}

export function getEventLogs() {
   const url = prefixUrl('/eventLogs');
   return dispatch => {
      return getJson(url)
         .then(checkStatus)
         .then(response => {
            dispatch(getEventLogsSuccess(response.data));
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
      return getJson(url)
         .then(checkStatus)
         .then(response => {
            dispatch(getEventRequestsSuccess(response.data));
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
      return postJson(url, log)
         .then(checkStatus)
         .then(response => {
            dispatch(addEventLogSuccess(response.data));
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
      return postJson(url, request)
         .then(checkStatus)
         .then(response => {
            dispatch(addEventRequestSuccess(response.data));
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
      return putJson(url, request)
         .then(checkStatus)
         .then(response => {
            dispatch(updateEventRequestSuccess(response.data));
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
      return putJson(url, rating)
         .then(checkStatus)
         .then(response => {
            dispatch(saveEventRatingSuccess(response.data));
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
      return postJson(url, rating)
         .then(checkStatus)
         .then(response => {
            dispatch(saveUserRatingSuccess(response.data));
            dispatch(resetNetwork());
         })
         .catch(error => {
            logError(error);
            dispatch(networkFailed());
         });
   };
}