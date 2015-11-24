var Auth = require('utils/auth');

module.exports = Chaplin.View.extend({
   noWrap: true,
   autoRender: true,
   container: '#main-region',

   events: {
      'click button': 'login'
   },

   initialize: function () {
      this.template = require('views/login/login');
      Chaplin.View.prototype.initialize.call(this, arguments);
   },

   getTemplateFunction: function () {
      return this.template;
   },

   getTemplateData: function () {
      return this.model.attributes;
   },

   render: function() {
      Chaplin.View.prototype.render.call(this, arguments);
      $('body').addClass('login');
   },

   dispose: function() {
      Chaplin.View.prototype.dispose.call(this, arguments);
      $('body').removeClass('login');
   },

   login: function(e) {
      e.preventDefault();
      Auth.login();
   }
});