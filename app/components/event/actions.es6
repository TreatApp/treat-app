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
         eventLogs: data
      }
   };
}

function getEventRequestsSuccess(data) {
   return {
      type: GET_EVENT_REQUESTS,
      state: {
         eventRequests: data
      }
   };
}

function addEventLogSuccess(data) {
   return {
      type: ADD_EVENT_LOG,
      state: {
         eventLog: data
      }
   };
}

function addEventRequestSuccess(data) {
   return {
      type: ADD_EVENT_REQUEST,
      state: {
         eventRequest: data
      }
   };
}

function updateEventRequestSuccess(data) {
   return {
      type: UPDATE_EVENT_REQUEST,
      state: {
         eventRequest: data
      }
   };
}

function saveEventRatingSuccess(data) {
   return {
      type: SAVE_EVENT_RATING,
      state: {
         eventRating: data
      }
   };
}

function saveUserRatingSuccess(data) {
   return {
      type: SAVE_USER_RATING,
      state: {
         userRating: data
      }
   };
}

export function getEventLogs(eventId) {
   return dispatch => {
      return getJson('/eventLogs/' + eventId)
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

export function getEventRequests(eventId) {
   return dispatch => {
      dispatch(networkProgress());
      return getJson('/eventRequests/' + eventId)
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

export function addEventLog(eventId, log) {
   return dispatch => {
      dispatch(networkProgress());
      return postJson('/eventLogs/' + eventId, log)
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

export function addEventRequest(eventId, request) {
   return dispatch => {
      dispatch(networkProgress());
      return postJson('/eventRequests/' + eventId, request)
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

export function updateEventRequest(eventId, request) {
   return dispatch => {
      dispatch(networkProgress());
      return putJson('/eventRequests/' + eventId, request)
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
   return dispatch => {
      dispatch(networkProgress());
      return putJson('/eventRatings', rating)
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
   return dispatch => {
      dispatch(networkProgress());
      return postJson('/userRatings', rating)
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