module.exports = {

   saveToken(authResponse) {
       localStorage.setItem('authToken', btoa(authResponse.userID + ':' + authResponse.accessToken));
   },

   getToken() {
      return localStorage.getItem('authToken');
   },

   getUserId() {
      return atob(this.getToken()).split(':')[0];
   }

};
