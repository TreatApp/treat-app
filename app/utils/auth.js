module.exports = {

   initialize: function() {
      FB.init({
         appId: '150880668605723',
         status: true,
         xfbml: true,
         version: 'v2.5'
      });
   },

   check: function() {
      var auth = this;
      FB.getLoginStatus(function(response) {
         if (response.status === 'connected') {
            auth.saveToken(response.authResponse);
         }
         else {
            Chaplin.utils.redirectTo({ url: '/' });
         }
      });
   },

   login: function() {
      var auth = this;
      Chaplin.mediator.publish('loading:show');
      FB.login(function(response) {
         if (response.status === 'connected') {
            auth.saveToken(response.authResponse);
            auth.getInfo();
         }
         else {
            Chaplin.mediator.publish('loading:hide');
            Chaplin.utils.redirectTo({ url: '/' });
         }
      }, {scope: 'public_profile, email'});
   },

   getInfo: function() {
      var auth = this;
      FB.api('/me', {fields: ['first_name', 'last_name', 'email']}, function(response) {
         auth.serverLogin(response);
      });
   },

   serverLogin: function(data) {
      var user = {
         externalId: data.id,
         firstName: data.first_name,
         lastName: data.last_name,
         email: data.email
      };

      $.ajax({
         type: 'post',
         dataType: 'json',
         contentType: 'application/json; charset=UTF-8',
         url: '/auth',
         data: JSON.stringify(user),
         success: _.bind(this.success, this)
      });
   },

   success: function() {
      Chaplin.utils.redirectTo({ url: '/main' });
   },

   logout: function() {
      FB.logout(function(response) {
         Chaplin.utils.redirectTo({ url: '/' });
      });
   },

   saveToken: function(authResponse) {
      sessionStorage.setItem('authToken', btoa(authResponse.userID + ':' + authResponse.accessToken));
   },

   getToken: function() {
      return sessionStorage.getItem('authToken');
   }
};
