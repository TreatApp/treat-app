import { getAuthToken } from './session';

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

export function fetchPostFile(file) {
   var formData = new FormData();
   formData.append('file', file);
   return withDefaultParams('POST', formData);
}

export function fetchPostForm(body) {
   return formRequest('POST', body);
}

export function fetchGet(){
   return jsonRequest('GET');
}

function jsonRequest(method, body) {
   const json = body ? JSON.stringify(body) : null;
   return withDefaultParams(method, json, 'application/json', 'application/json');
}

function formRequest(method, body) {
   const form = body ? encodeFormData(body) : null;
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
   let params = {
      headers: {
         'Authorization': 'Basic ' + getAuthToken()
      },
      mode: 'cors',
      cache: 'default',
      method: method
   };
   if(body) {
      params.body = body;
   }
   if(accept) {
      params.headers = Object.assign(params.headers, { 'Accept': accept });
   }
   if(contentType) {
      params.headers = Object.assign(params.headers, { 'Content-Type': contentType });
   }
   return params;
}