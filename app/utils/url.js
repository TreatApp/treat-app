module.exports = {

   apiUrl: 'http://treat.cloudapp.net/api',

   prefix: function(url) {
      if(url.indexOf('/') == 0) {
         return this.apiUrl + url;
      }
      return url;
   }

};
