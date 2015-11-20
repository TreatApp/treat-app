module.exports = Chaplin.View.extend({
   noWrap: true,
   autoRender: true,

   initialize: function() {
      this.template = require('views/main/event-item');
      Chaplin.View.prototype.initialize.call(this, arguments);
   },

   events: {
      'click a' : 'showEvent'
   },

   showEvent: function(event) {
      this.publishEvent('showEvent', this.model.get('id'));
      return false;
   },

   getTemplateFunction: function() {
      return this.template;
   },

   getTemplateData: function() {
      return this.model.attributes;
   }
});