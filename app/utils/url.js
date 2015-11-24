module.exports = {

   apiUrl: 'http://' + window.location.hostname + ':56439/api',

   prefix: function(url) {
      if(url.indexOf('/') == 0) {
         return this.apiUrl + url;
      }
      return url;
   }

};
