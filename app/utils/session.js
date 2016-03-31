module.exports = {

   saveAuthToken(authResponse) {
       localStorage.setItem('authToken', btoa(authResponse.userID + ':' + authResponse.accessToken));
   },

   getAuthToken() {
      return localStorage.getItem('authToken');
   },

   getUserId() {
      return atob(this.getAuthToken()).split(':')[0];
   }

};
