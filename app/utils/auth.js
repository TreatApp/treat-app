module.exports = {

   initialize: function() {
      if(!window.isPhone) {
         facebookConnectPlugin.browserInit('155506791476444');
      }
   },

   check: function() {
      var auth = this;
      facebookConnectPlugin.getLoginStatus(
          function(response) {
             if (response.status === 'connected') {
                auth.saveToken(response.authResponse);
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
      this.initialize();
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
      facebookConnectPlugin.api('/me',
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
      sessionStorage.setItem('authToken', btoa(authResponse.userID + ':' + authResponse.accessToken));
   },

   getToken: function() {
      return sessionStorage.getItem('authToken');
   },

   getUserId: function() {
      return atob(this.getToken()).split(':')[0];
   }
};
