import 'whatwg-fetch';
import { fetchGet, checkStatus, prefixUrl, logError} from '../../utils/network';
import { networkFailed, resetNetwork } from '../../actions';

export const GET_MY_EVENTS = 'GET_MY_EVENTS';

function getMyEventsSuccess(json) {
   return {
      type: GET_MY_EVENTS,
      state: {
         events: json
      }
   };
}

export function getMyEvents() {
   const url = prefixUrl('/userEvents');
   return dispatch => {
      return fetch(url, fetchGet())
         .then(checkStatus)
         .then(res => res.json())
         .then(json => {
            dispatch(getMyEventsSuccess(json));
            dispatch(resetNetwork());
         })
         .catch(error => {
            logError(error);
            dispatch(networkFailed());
         });
   };
}
