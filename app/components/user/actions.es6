import 'whatwg-fetch';
import { fetchGet, checkStatus, prefixUrl, logError} from '../../utils/network';
import { networkProgress, networkFailed, resetNetwork } from '../../actions';

export const GET_PROFILE = 'GET_PROFILE';
export const EDIT_PROFILE = 'EDIT_PROFILE';
export const ADD_BANK_ACCOUNT = 'ADD_BANK_ACCOUNT';
export const EDIT_BANK_ACCOUNT = 'EDIT_BANK_ACCOUNT';
export const ADD_PAYMENT_METHOD = 'ADD_PAYMENT_METHOD';

function getProfileSuccess(json) {
   return {
      type: GET_PROFILE,
      state: {
         profile: json
      }
   };
}

function saveProfileSuccess(json) {
   return {
      type: EDIT_PROFILE,
      state: {
         profile: json
      }
   };
}

function addBankAccountSuccess(json) {
   return {
      type: ADD_BANK_ACCOUNT,
      state: {
         bankAccount: json
      }
   };
}

function saveBankAccountSuccess(json) {
   return {
      type: EDIT_BANK_ACCOUNT,
      state: {
         bankAccount: json
      }
   };
}

function addPaymentMethodSuccess(json) {
   return {
      type: ADD_PAYMENT_METHOD,
      state: {
         paymentMethod: json
      }
   };
}

export function getProfile() {
   const url = prefixUrl('/user');
   return dispatch => {
      dispatch(networkProgress());
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

export function saveProfile(user) {
   const url = prefixUrl('/user');
   return dispatch => {
      dispatch(networkProgress());
      return fetch(url, fetchPut(user))
         .then(checkStatus)
         .then(json => {
            dispatch(saveProfileSuccess(json));
            dispatch(resetNetwork());
         })
         .catch(error => {
            logError(error);
            dispatch(networkFailed());
         });
   };
}

export function addBankAccount(bankAccount) {
   const url = prefixUrl('/bankAccount');
   return dispatch => {
      dispatch(networkProgress());
      return fetch(url, fetchPost(bankAccount))
         .then(checkStatus)
         .then(json => {
            dispatch(addBankAccountSuccess(json));
            dispatch(resetNetwork());
         })
         .catch(error => {
            logError(error);
            dispatch(networkFailed());
         });
   };
}

export function saveBankAccount(bankAccount) {
   const url = prefixUrl('/bankAccount');
   return dispatch => {
      dispatch(networkProgress());
      return fetch(url, fetchPut(bankAccount))
         .then(checkStatus)
         .then(json => {
            dispatch(saveBankAccountSuccess(json));
            dispatch(resetNetwork());
         })
         .catch(error => {
            logError(error);
            dispatch(networkFailed());
         });
   };
}

export function addPaymentMethod(paymentMethod) {
   const url = prefixUrl('/paymentMethod');
   return dispatch => {
      dispatch(networkProgress());
      return fetch(url, fetchPost(paymentMethod))
         .then(checkStatus)
         .then(json => {
            dispatch(addPaymentMethodSuccess(json));
            dispatch(resetNetwork());
         })
         .catch(error => {
            logError(error);
            dispatch(networkFailed());
         });
   };
}
