var Application = require('application');
var Auth = require('utils/auth');
var Url = require('utils/url');
var LoadingView = require('views/loading-view');

$(function () {
   Auth.initialize();

   $.ajaxSetup({
      beforeSend: function(jqXHR) {
         this.url = Url.prefix(this.url);

         if(Auth.getToken()) {
            jqXHR.setRequestHeader('Authorization', 'Basic ' + Auth.getToken());
         }
      }
   });

   $(document).ajaxStart(function() {
      Chaplin.mediator.publish('loading:show');
   });

   $(document).ajaxStop(function() {
      Chaplin.mediator.publish('loading:hide');
   });

   Handlebars.registerHelper('date', function(date, format) {
      return moment(date).format(format);
   });

   new LoadingView();

   new Application({
         title: 'Treat',
         controllerSuffix: '-controller',
         routes: require('routes')
      }
   );
});
