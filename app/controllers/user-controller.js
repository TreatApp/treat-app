var AuthController = require('controllers/auth-controller');
var NavController = require('controllers/nav-controller');
var HeaderView = require('views/user/header-view');
var UserView = require('views/user/user-view');
var EditUserView = require('views/user/edit-user-view');
var UserModel = require('models/user-model');

module.exports = AuthController.extend({
   show: function (params, options) {
      this.model = new UserModel({ id: 7 });

      this.nav = new NavController(options);

      this.model.set('edit', false);
      this.headerView = new HeaderView({
         model: this.model
      });

      this.model.fetch({
         success: _.bind(this.showUser, this)
      });
   },

   edit: function(params, options) {
      this.model = new UserModel({ id: 7 });

      this.nav = new NavController(options);

      this.model.set('edit', true);
      this.headerView = new HeaderView({
         model: this.model
      });
      this.listenTo(this.headerView, 'save', this.saveUser);

      this.model.fetch({
         success: _.bind(this.editUser, this)
      });
   },

   showUser: function() {
      this.view = new UserView({
         model: this.model
      });
   },

   editUser: function() {
      this.view = new EditUserView({
         model: this.model
      });
   },

   saveUser: function() {
      var data = this.view.getData();
      $.ajax({
         type: 'put',
         dataType: 'json',
         contentType: 'application/json; charset=UTF-8',
         url: '/users',
         data: data,
         success: _.bind(this.success, this)
      });
   },

   success: function() {
      Chaplin.utils.redirectTo({ url: '/user' });
   }
});