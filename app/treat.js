var Application = require('application');
var Auth = require('utils/auth');
var Url = require('utils/url');
var ErrorView = require('views/error-view');
var LoadingView = require('views/loading-view');

$(function () {
   window.isPhone = false;

   if (document.URL.indexOf("http://") === -1 && document.URL.indexOf("https://") === -1) {
      window.isPhone = true;
   }

   if (window.isPhone) {
      document.addEventListener("deviceready", onDeviceReady, false);
   }
   else {
      onDeviceReady();
   }
});

function onDeviceReady() {
   if(!window.isPhone) {
      Auth.initialize();
   }
   else {
      FastClick.attach(document.body);
   }

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

   $(document).ajaxError(function(event, jqXHR, ajaxSettings, thrownError) {
      Chaplin.mediator.publish('error:show', 'Nätverksanropet misslyckades (' + jqXHR.status  + ')');
   });

   Handlebars.registerHelper('date', function(date, format) {
      return moment(date).format(format);
   });

   new ErrorView();
   new LoadingView();

   new Application({
         title: 'Treat',
         controllerSuffix: '-controller',
         routes: require('routes')
      }
   );
}
