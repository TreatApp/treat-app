import { getJson, checkStatus, logError} from '../../utils/network';
import { networkFailed, resetNetwork } from '../../actions';

export const GET_EVENTS = 'GET_EVENTS';

function getEventsSuccess(data) {
   return {
      type: GET_EVENTS,
      state: {
         events: data
      }
   };
}

export function getEvents() {
   return dispatch => {
      return getJson('/events')
         .then(checkStatus)
         .then(response => {
            dispatch(getEventsSuccess(response.data));
            dispatch(resetNetwork());
         })
         .catch(error => {
            logError(error);
            dispatch(networkFailed());
         });
   };
}
