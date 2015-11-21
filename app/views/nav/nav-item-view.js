module.exports = Chaplin.View.extend({
   noWrap: true,
   autoRender: true,

   initialize: function() {
      this.template = require('views/nav/nav-item');
      Chaplin.View.prototype.initialize.call(this, arguments);
      this.model.on('change:active', _.bind(this.toggleActive, this));
   },

   getTemplateFunction: function() {
      return this.template;
   },

   getTemplateData: function() {
      return this.model.attributes;
   },

   toggleActive: function() {
      this.$el.toggleClass('active', this.model.get('active'));
   }
});