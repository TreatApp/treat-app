module.exports = {
   initialize: function() {
      FB.init({
         appId: '150880668605723',
         xfbml: true,
         version: 'v2.5'
      });

      this.check();
   },

   check: function() {
      FB.getLoginStatus(function(response) {
         console.log('status checked and...', response);

         if (response.status === 'connected') {
            // Logged into your app and Facebook.
         } else if (response.status === 'not_authorized') {
            // The person is logged into Facebook, but not your app.
         } else {
            // The person is not logged into Facebook, so we're not sure if
            // they are logged into this app or not.
         }
      });
   },

   login: function() {
      FB.login(function(response) {
         console.log('tried login and...', response);

         if (response.status === 'connected') {
            // Logged into your app and Facebook.
         } else if (response.status === 'not_authorized') {
            // The person is logged into Facebook, but not your app.
         } else {
            // The person is not logged into Facebook, so we're not sure if
            // they are logged into this app or not.
         }
      }, {scope: 'public_profile, email'});
   }
};
