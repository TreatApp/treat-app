module.exports = Chaplin.View.extend({
   noWrap: true,
   autoRender: true,
   container: '#main-region',

   events: {
      'click .js-logout': 'logout'
   },

   initialize: function() {
      this.template = require('./profile');
      Chaplin.View.prototype.initialize.call(this, arguments);
   },

   getTemplateFunction: function() {
      return this.template;
   },

   getTemplateData: function() {
      return this.model.attributes;
   },

   logout: function(e) {
      e.preventDefault();
      this.trigger('logout');
   }
});