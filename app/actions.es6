import 'whatwg-fetch';
import {fetchGet, fetchDelete, checkStatus, prefixUrl, logError} from 'utils/ajax-util';

export const NETWORK_PROGRESS = 'NETWORK_PROGRESS';
export const NETWORK_FAILED = 'NETWORK_FAILED';

export function networkProgress() {
   return {
      type: NETWORK_PROGRESS,
      state: {
         networkProgress: true,
         networkFailed: false
      }
   };
}

export function networkFailed() {
   return {
      type: NETWORK_FAILED,
      state: {
         networkProgress: false,
         networkFailed: true
      }
   };
}
