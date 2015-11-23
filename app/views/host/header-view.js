module.exports = Chaplin.View.extend({
   noWrap: true,
   autoRender: true,
   container: '#header-region',

   events: {
      'click .js-save': 'save'
   },

   initialize: function() {
      this.template = require('views/host/header');
      Chaplin.View.prototype.initialize.call(this, arguments);
   },

   getTemplateFunction: function() {
      return this.template;
   },

   getTemplateData: function() {
      return this.model.attributes;
   },

   save: function(e) {
      e.preventDefault();
      this.trigger('save');
   }
});