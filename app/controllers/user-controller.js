var AuthController = require('controllers/auth-controller');
var NavController = require('controllers/nav-controller');
var HeaderView = require('views/user/header-view');
var UserView = require('views/user/user-view');
var ProfileView = require('views/user/profile/profile-view');
var EditProfileView = require('views/user/profile/edit-profile-view');
var CreditCardView = require('views/user/credit-card/credit-card-view');
var EditCreditCardView = require('views/user/credit-card/edit-credit-card-view');
var BankAccountView = require('views/user/bank-account/bank-account-view');
var EditBankAccountView = require('views/user/bank-account/edit-bank-account-view');
var UserModel = require('models/user-model');
var Auth = require('utils/auth');

module.exports = AuthController.extend({

   _initLayout: function(options) {
      this.nav = new NavController(options);

      this.headerView = new HeaderView({
         model: this.model
      });
   },

   show: function(params, options) {
      this.model = new UserModel();

      this.collection = new Chaplin.Collection([
         { action: 'profile', title: 'Profile' },
         { action: 'bank-account', title: 'Bank account' },
         { action: 'credit-card', title: 'Credit card' }
      ]);

      this._initLayout(options);

      this.view = new UserView({
         model: this.model,
         collection: this.collection
      });
   },

   viewProfile: function (params, options) {
      this.model = new UserModel({ id: params.id });
      this.model.set('edit', false);
      this._initLayout(options);

      this.model.fetch({
         success: _.bind(this.showProfileView, this)
      });
   },

   editProfile: function(params, options) {
      this.model = new UserModel();
      this.model.set('edit', true);
      this._initLayout(options);

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

   viewCreditCard: function (params, options) {
      this.model = new UserModel({ id: params.id });
      this.model.set('edit', false);
      this._initLayout(options);

      this.view = new CreditCardView({
         model: this.model
      });
   },

   editCreditCard: function(params, options) {
      this.model = new UserModel();
      this.model.set('edit', true);
      this._initLayout(options);

      this.view = new EditCreditCardView({
         model: this.model
      });
   },

   viewBankAccount: function (params, options) {
      this.model = new UserModel({ id: params.id });
      this.model.set('edit', false);
      this._initLayout(options);

      this.view = new BankAccountView({
         model: this.model
      });
   },

   editBankAccount: function(params, options) {
      this.model = new UserModel();
      this.model.set('edit', true);
      this._initLayout(options);

      this.view = new EditBankAccountView({
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