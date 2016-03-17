import 'whatwg-fetch';
import { fetchGet, checkStatus, prefixUrl, logError} from '../../utils/network';
import { networkFailed, resetNetwork } from '../../actions';

export const GET_EVENTS = 'GET_EVENTS';

function getEventsSuccess(json) {
   return {
      type: GET_EVENTS,
      state: {
         events: json
      }
   };
}

export function getEvents() {
   const url = prefixUrl('/events');
   return dispatch => {
      return fetch(url, fetchGet())
         .then(checkStatus)
         .then(res => res.json())
         .then(json => {
            dispatch(getEventsSuccess(json));
            dispatch(resetNetwork());
         })
         .catch(error => {
            logError(error);
            dispatch(networkFailed());
         });
   };
}
