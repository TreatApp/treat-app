import { getJson, putJson, postJson, postFile, checkStatus, logError} from '../../utils/network';
import { networkProgress, networkFailed, resetNetwork } from '../../actions';

export const GET_USER_EVENTS = 'GET_USER_EVENTS';
export const GET_CATEGORIES = 'GET_CATEGORIES';
export const ADD_EVENT = 'ADD_EVENT';
export const EDIT_EVENT = 'EDIT_EVENT';
export const UPLOAD_IMAGE = 'UPLOAD_IMAGE';
export const UPLOAD_PROGRESS = 'UPLOAD_PROGRESS';

function getUserEventsSuccess(data) {
   return {
      type: GET_USER_EVENTS,
      state: {
         events: data
      }
   };
}

function getCategoriesSuccess(data) {
   return {
      type: GET_CATEGORIES,
      state: {
         events: data
      }
   };
}

function uploadImageProgress(data) {
   return {
      type: UPLOAD_PROGRESS,
      state: {
         progress: data
      }
   };
}

function uploadImageSuccess(data) {
   return {
      type: UPLOAD_IMAGE,
      state: {
         image: data
      }
   };
}

function addEventSuccess(data) {
   return {
      type: ADD_EVENT,
      state: {
         event: data
      }
   };
}

function saveEventSuccess(data) {
   return {
      type: EDIT_EVENT,
      state: {
         event: data
      }
   };
}

export function getUserEvents() {
   return dispatch => {
      dispatch(networkProgress());
      return getJson('/userEvents')
         .then(checkStatus)
         .then(response => {
            dispatch(getUserEventsSuccess(response.data));
            dispatch(resetNetwork());
         })
         .catch(error => {
            logError(error);
            dispatch(networkFailed());
         });
   };
}

export function getCategories() {
   return dispatch => {
      dispatch(networkProgress());
      return getJson('/categories')
         .then(checkStatus)
         .then(response => {
            dispatch(getCategoriesSuccess(response.data));
            dispatch(resetNetwork());
         })
         .catch(error => {
            logError(error);
            dispatch(networkFailed());
         });
   };
}

export function uploadImage(file) {
   return dispatch => {
      dispatch(networkProgress());
      dispatch(uploadImageProgress(0));
      return postFile('/eventImage', file, function(progressEvent) {
            var percentCompleted = progressEvent.loaded / progressEvent.total;
            dispatch(uploadImageProgress(percentCompleted));
         })
         .then(checkStatus)
         .then(response => {
            dispatch(uploadImageSuccess(response.data));
            dispatch(resetNetwork());
         })
         .catch(error => {
            logError(error);
            dispatch(networkFailed());
         });
   };
}

export function addEvent(event) {
   return dispatch => {
      dispatch(networkProgress());
      return postJson('/events', event)
         .then(checkStatus)
         .then(response => {
            dispatch(addEventSuccess(response.data));
            dispatch(resetNetwork());
         })
         .catch(error => {
            logError(error);
            dispatch(networkFailed());
         });
   };
}

export function saveEvent(event) {
   return dispatch => {
      dispatch(networkProgress());
      return putJson('/events', event)
         .then(checkStatus)
         .then(response => {
            dispatch(saveEventSuccess(response.data));
            dispatch(resetNetwork());
         })
         .catch(error => {
            logError(error);
            dispatch(networkFailed());
         });
   };
}