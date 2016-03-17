import 'whatwg-fetch';
import { fetchGet, checkStatus, prefixUrl, logError} from '../../utils/network';
import { networkFailed, resetNetwork } from '../../actions';

export const GET_PROFILE = 'GET_PROFILE';

function getProfileSuccess(json) {
   return {
      type: GET_PROFILE,
      state: {
         profile: json
      }
   };
}

export function getProfile() {
   const url = prefixUrl('/user');
   return dispatch => {
      console.log('fetching user', url);
      return fetch(url, fetchGet())
         .then(checkStatus)
         .then(res => res.json())
         .then(json => {
            dispatch(getProfileSuccess(json));
            dispatch(resetNetwork());
         })
         .catch(error => {
            logError(error);
            dispatch(networkFailed());
         });
   };
}
