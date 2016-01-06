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
var SessionModel = require('models/session-model');
var BankAccountsCollection = require('collections/bank-accounts-collection');
var PaymentMethodsCollection = require('collections/payment-methods-collection');
var Payment = require('utils/payment');
var Auth = require('utils/auth');

module.exports = Chaplin.Controller.extend({

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

   showProfileView: function() {
      this.view = new ProfileView({
         model: this.model
      });
      this.listenTo(this.view, 'logout', this.logout);
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

   showEditProfileView: function() {
      this.view = new EditProfileView({
         model: this.model
      });
   },

   viewCreditCard: function (params, options) {
      this.model = new UserModel();
      this.model.set('edit', false);
      this._initLayout(options);

      this.collection = new PaymentMethodsCollection();
      this.collection.fetch({
         success: _.bind(this.showCreditCardView, this)
      });
   },

   showCreditCardView: function() {
      this.view = new CreditCardView({
         model: this.model
      });
   },

   editCreditCard: function(params, options) {
      this.model = new UserModel();
      this.model.set('edit', true);
      this._initLayout(options);

      this.listenTo(this.headerView, 'save', this.savePaymentMethod);

      this.collection = new PaymentMethodsCollection();
      this.collection.fetch({
         success: _.bind(this.showEditCreditCardView, this)
      });
   },

   showEditCreditCardView: function() {
      var that = this;
      this.view = new EditCreditCardView({
         model: (this.collection.length > 0) ? this.collection.models[0] : new Chaplin.Model()
      });
      this.session = new SessionModel();
      this.session.fetch({
         success: function(session) {
            Payment.initialize({
               container: 'braintree-form',
               token: session.get('paymentToken'),
               submit: _.bind(that.savePaymentMethod, that)
            });
         }
      });
   },

   viewBankAccount: function (params, options) {
      this.model = new UserModel();
      this.model.set('edit', false);
      this._initLayout(options);

      this.collection = new BankAccountsCollection();
      this.collection.fetch({
         success: _.bind(this.showBankAccountView, this)
      });
   },

   showBankAccountView: function() {
      this.view = new BankAccountView({
         model: this.model
      });
   },

   editBankAccount: function(params, options) {
      this.model = new UserModel();
      this.model.set('edit', true);
      this._initLayout(options);

      this.listenTo(this.headerView, 'save', this.saveBankAccount);

      this.collection = new BankAccountsCollection();
      this.collection.fetch({
         success: _.bind(this.showEditBankAccountView, this)
      });
   },

   showEditBankAccountView: function() {
      this.view = new EditBankAccountView({
         model: (this.collection.length > 0) ? this.collection.models[0] : new Chaplin.Model()
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
         success: _.bind(this.saveUserSuccess, this)
      });
   },

   saveUserSuccess: function() {
      Chaplin.utils.redirectTo({ url: '/user/profile' });
   },

   saveBankAccount: function() {
      var data = this.view.getData();
      $.ajax({
         type: data.id ? 'put' : 'post',
         dataType: 'json',
         contentType: 'application/json; charset=UTF-8',
         url: '/bankAccount',
         data: data,
         success: _.bind(this.saveBankAccountSuccess, this)
      });
   },

   saveBankAccountSuccess: function() {
      Chaplin.utils.redirectTo({ url: '/user/bank-account' });
   },

   savePaymentMethod: function(data) {
      var paymentMethod =  {
         externalId: data.nonce,
         name: data.details.cardType,
         description: data.details.lastTwo
      };
      $.ajax({
         type: 'post',
         dataType: 'json',
         contentType: 'application/json; charset=UTF-8',
         url: '/paymentMethod',
         data: JSON.stringify(paymentMethod),
         success: _.bind(this.savePaymentMethodSuccess, this)
      });
   },

   savePaymentMethodSuccess: function() {
      Chaplin.utils.redirectTo({ url: '/user/credit-card' });
   },

   logout: function() {
      Auth.logout();
   }
});