var NavController = require('controllers/nav-controller');
var UserView = require('views/user/user-view');
var UserModel = require('models/user-model');

module.exports = Chaplin.Controller.extend({
   show: function (params, options) {
      this.model = new UserModel({ id: 7 });

      this.nav = new NavController(options);

      this.model.fetch({
         success: _.bind(this.showUser, this)
      });
   },

   showUser: function() {
      this.view = new UserView({
         model: this.model
      });
   }
});