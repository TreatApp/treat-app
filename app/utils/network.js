import axios, { xhr, dispatchRequest } from 'axios';
import { getAuthToken } from './session';

const instance = axios.create({
   baseURL: 'http://treat.cloudapp.net/api',
   headers: {
      'Authorization': 'Basic ' + getAuthToken()
   }
});

const jsonHeaders = {
   headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
   }
};

export function checkStatus(response) {
   if (response.status >= 200 && response.status < 300) {
      return response
   }
   else {
      const error = new Error(response.status);
      error.message = response.statusText;
      error.response = response;
      throw error;
   }
}

export function logError(error) {
   console.error("Network exception", error.message, error);
}

export function postFile(url, file, progress) {
   var formData = new FormData();
   formData.append('file', file);

   return instance.post(url, formData, {
      progress: function(progressEvent) {
         var percentCompleted = progressEvent.loaded / progressEvent.total;
         console.log('progress', progressEvent, percentCompleted);
      }
   });
}

export function getJson(url) {
   return instance.get(url, jsonHeaders);
}

export function putJson(url, data) {
   return instance.put(url, JSON.stringify(data), jsonHeaders);
}

export function postJson(url, data) {
   return instance.post(url, JSON.stringify(data), jsonHeaders);
}