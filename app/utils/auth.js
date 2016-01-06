module.exports = {

   initialize: function() {
      if(!window.isPhone) {
         var auth = this;
         window.fbAsyncInit = function() {
            facebookConnectPlugin.browserInit('155506791476444');

            if(auth.getToken()) {
               auth.check();
            }
         };
      }
      else {
         if(this.getToken()) {
            this.check();
         }
      }
   },

   check: function() {
      var auth = this;
      Chaplin.mediator.publish('loading:show');
      facebookConnectPlugin.getLoginStatus(
         function(response) {
            if (response.status === 'connected') {
               auth.saveToken(response.authResponse);
               Chaplin.utils.redirectTo({url: '/main'});
            }
            else {
               Chaplin.utils.redirectTo({url: '/'});
            }
          },
          function(response) {
             console.log('Error', response);
             Chaplin.utils.redirectTo({url: '/'});
          }
      );
   },

   login: function() {
      var auth = this;
      Chaplin.mediator.publish('loading:show');
      facebookConnectPlugin.login(
          ['public_profile', 'email'],
          function(response) {
            if (response.status === 'connected') {
               auth.saveToken(response.authResponse);
               auth.getInfo();
            }
            else {
               Chaplin.mediator.publish('loading:hide');
               Chaplin.utils.redirectTo({ url: '/' });
            }
          },
          function(response) {
             alert('Login error: ' + response);
             Chaplin.mediator.publish('loading:hide');
          }
      );
   },

   getInfo: function() {
      var auth = this;
      facebookConnectPlugin.api('/me?fields=first_name,last_name,email',
          null,
          function(response) {
            auth.serverLogin(response);
          },
          function(response) {
             alert('Get info error: ' + response);
          }
      );
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
         success: function() {
            Chaplin.utils.redirectTo({ url: '/main' });
         }
      });
   },

   logout: function() {
      facebookConnectPlugin.logout(
          function(response) {
             Chaplin.utils.redirectTo({ url: '/' });
          },
          function(response) {
             alert('Logout error: ' + response);
          }
      );
   },

   saveToken: function(authResponse) {
       localStorage.setItem('authToken', btoa(authResponse.userID + ':' + authResponse.accessToken));
   },

   getToken: function() {
      return localStorage.getItem('authToken');
   },

   getUserId: function() {
      return atob(this.getToken()).split(':')[0];
   }
};
