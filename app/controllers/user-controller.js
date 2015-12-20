var AuthController = require('controllers/auth-controller');
var NavController = require('controllers/nav-controller');
var HeaderView = require('views/user/header-view');
var UserView = require('views/user/user-view');
var ProfileView = require('views/user/profile/profile-view');
var EditProfileView = require('views/user/profile/edit-profile-view');
var UserModel = require('models/user-model');
var Auth = require('utils/auth');

module.exports = AuthController.extend({

   show: function(params, options) {
      this.model = new UserModel();

      this.collection = new Chaplin.Collection([
         { action: 'profile', title: 'Profile' },
         { action: 'bank-account', title: 'Bank account' },
         { action: 'credit-card', title: 'Credit card' }
      ]);

      this.nav = new NavController(options);

      this.headerView = new HeaderView({
         model: this.model
      });

      this.view = new UserView({
         model: this.model,
         collection: this.collection
      });
   },

   viewProfile: function (params, options) {
      this.model = new UserModel({ id: params.id });

      this.nav = new NavController(options);

      this.model.set('edit', false);
      this.headerView = new HeaderView({
         model: this.model
      });

      this.model.fetch({
         success: _.bind(this.showProfileView, this)
      });
   },

   editProfile: function(params, options) {
      this.model = new UserModel();

      this.nav = new NavController(options);

      this.model.set('edit', true);
      this.headerView = new HeaderView({
         model: this.model
      });
      this.listenTo(this.headerView, 'save', this.saveUser);

      this.model.fetch({
         success: _.bind(this.showEditProfileView, this)
      });
   },

   showProfileView: function() {
      this.view = new ProfileView({
         model: this.model
      });
      this.listenTo(this.view, 'logout', this.logout);
   },

   showEditProfileView: function() {
      this.view = new EditProfileView({
         model: this.model
      });
   },

   saveUser: function() {
      var data = this.view.getData();
      $.ajax({
         type: 'put',
         dataType: 'json',
         contentType: 'application/json; charset=UTF-8',
         url: '/user',
         data: data,
         success: _.bind(this.success, this)
      });
   },

   success: function() {
      Chaplin.utils.redirectTo({ url: '/user/profile' });
   },

   logout: function() {
      Auth.logout();
   }
});