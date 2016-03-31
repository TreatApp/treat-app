import { getJson, putJson, postJson, checkStatus, logError} from '../../utils/network';
import { networkProgress, networkFailed, resetNetwork } from '../../actions';

export const GET_PROFILE = 'GET_PROFILE';
export const EDIT_PROFILE = 'EDIT_PROFILE';
export const ADD_BANK_ACCOUNT = 'ADD_BANK_ACCOUNT';
export const EDIT_BANK_ACCOUNT = 'EDIT_BANK_ACCOUNT';
export const ADD_PAYMENT_METHOD = 'ADD_PAYMENT_METHOD';

function getProfileSuccess(data) {
   return {
      type: GET_PROFILE,
      state: {
         profile: data
      }
   };
}

function saveProfileSuccess(data) {
   return {
      type: EDIT_PROFILE,
      state: {
         profile: data
      }
   };
}

function addBankAccountSuccess(data) {
   return {
      type: ADD_BANK_ACCOUNT,
      state: {
         bankAccount: data
      }
   };
}

function saveBankAccountSuccess(data) {
   return {
      type: EDIT_BANK_ACCOUNT,
      state: {
         bankAccount: data
      }
   };
}

function addPaymentMethodSuccess(data) {
   return {
      type: ADD_PAYMENT_METHOD,
      state: {
         paymentMethod: data
      }
   };
}

export function getProfile(userId) {
   const url = '/user' + (userId ? '/' + userId : '');
   return dispatch => {
      dispatch(networkProgress());
      return getJson(url)
         .then(checkStatus)
         .then(response => {
            dispatch(getProfileSuccess(response.data));
            dispatch(resetNetwork());
         })
         .catch(error => {
            logError(error);
            dispatch(networkFailed());
         });
   };
}

export function saveProfile(user) {
   return dispatch => {
      dispatch(networkProgress());
      return putJson('/user', user)
         .then(checkStatus)
         .then(response => {
            dispatch(saveProfileSuccess(response.data));
            dispatch(resetNetwork());
         })
         .catch(error => {
            logError(error);
            dispatch(networkFailed());
         });
   };
}

export function addBankAccount(bankAccount) {
   return dispatch => {
      dispatch(networkProgress());
      return postJson('/bankAccount', bankAccount)
         .then(checkStatus)
         .then(response => {
            dispatch(addBankAccountSuccess(response.data));
            dispatch(resetNetwork());
         })
         .catch(error => {
            logError(error);
            dispatch(networkFailed());
         });
   };
}

export function saveBankAccount(bankAccount) {
   return dispatch => {
      dispatch(networkProgress());
      return putJson('/bankAccount', bankAccount)
         .then(checkStatus)
         .then(response => {
            dispatch(saveBankAccountSuccess(response.data));
            dispatch(resetNetwork());
         })
         .catch(error => {
            logError(error);
            dispatch(networkFailed());
         });
   };
}

export function addPaymentMethod(paymentMethod) {
   return dispatch => {
      dispatch(networkProgress());
      return postJson('/paymentMethod', paymentMethod)
         .then(checkStatus)
         .then(response => {
            dispatch(addPaymentMethodSuccess(response.data));
            dispatch(resetNetwork());
         })
         .catch(error => {
            logError(error);
            dispatch(networkFailed());
         });
   };
}
