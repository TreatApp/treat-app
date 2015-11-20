var Application = require('application');

$(function () {
   $.ajaxSetup({
      beforeSend: function(jqXHR) {
         if(window.location.hostname === 'localhost') {
            this.url = 'http://localhost:56439/api' + this.url;
         }
      }
   });

   new Application({
         title: 'Treat',
         controllerSuffix: '-controller',
         routes: require('routes')
      }
   );
});
