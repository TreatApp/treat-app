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
      FB.getLoginStatus(function(response) {
         if (response.status !== 'connected') {
            Chaplin.utils.redirectTo({ url: '/' });
         }
      });
   },

   login: function() {
      FB.login(function(response) {
         if (response.status === 'connected') {
            Chaplin.utils.redirectTo({ url: '/main' });
         }
         else {
            Chaplin.utils.redirectTo({ url: '/' });
         }
      }, {scope: 'public_profile, email'});
   },

   getInfo: function() {
      FB.api('/me', function(response) {
         console.log(JSON.stringify(response));
      });
   },

   logout: function() {
      FB.logout(function(response) {
         Chaplin.utils.redirectTo({ url: '/' });
      });
   }
};
