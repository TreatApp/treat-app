import { getToken } from './auth';

export function prefixUrl(url) {
   if(url.indexOf('/') === 0) {
      return 'http://treat.cloudapp.net/api' + url;
   }
   return url;
}

export function checkStatus(response) {
   if (response.status >= 200 && response.status < 300) {
      return response
   }
   else {
      const error = new Error(response.status);
      error.message = `Network request failed", type: ${response.type} status: ${response.status}, message: ${response.statusText}`;
      error.response = response;
      throw error
   }
}

export function logError(error) {
   console.error("Exception in fetch chain", error.message, error);
}

export function fetchDelete() {
   return jsonRequest('DELETE');
}

export function fetchPut(body) {
   return jsonRequest('PUT', body);
}

export function fetchPost(body) {
   return jsonRequest('POST', body);
}

export function fetchPostForm(body) {
   return formRequest('POST', body);
}

export function fetchGet(){
   return jsonRequest('GET');
}

function jsonRequest(method, body) {
   const json = body !== undefined ? { body: JSON.stringify(body) } : {};
   return withDefaultParams(method, json, 'application/json', 'application/json');
}

function formRequest(method, body) {
   const form = body !== undefined ? { body: encodeFormData(body) } : {};
   return withDefaultParams(method, form, '*/*', 'application/x-www-form-urlencoded');
}

function encodeFormData(obj) {
   let formData = [];
   for (var key in obj) {
      formData.push(key + '=' + encodeURIComponent(obj[key]));
   }
   return formData.join('&');
}

function withDefaultParams(method, body, accept, contentType) {
   return Object.assign({
      headers: {
         'Authorization': 'Basic ' + getToken(),
         'Accept': accept,
         'Content-Type': contentType
      },
      mode: 'cors',
      cache: 'default'
   }, { method: method }, body);
}