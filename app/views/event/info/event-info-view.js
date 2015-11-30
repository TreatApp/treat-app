module.exports = Chaplin.View.extend({
   noWrap: false,
   autoRender: true,
   container: '#tab-info',

   initialize: function() {
      this.template = require('views/event/info/event-info');
      Chaplin.View.prototype.initialize.call(this, arguments);
   },

   getTemplateFunction: function() {
      return this.template;
   },

   getTemplateData: function() {
      return this.model.attributes;
   }
});