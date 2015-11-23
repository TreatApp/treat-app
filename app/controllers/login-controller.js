var LoginView = require('views/login/login-view');

module.exports = Chaplin.Controller.extend({
   show: function (params, options) {
      this.model = new Chaplin.Model();

      this.view = new LoginView({
         model: this.model
      });
   }
});