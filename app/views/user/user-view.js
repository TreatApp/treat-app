module.exports = Chaplin.View.extend({
   noWrap: true,
   autoRender: true,
   container: '#main-region',

   initialize: function() {
      this.template = require('views/user/user');
      Chaplin.View.prototype.initialize.call(this, arguments);

      this.model.on('', this.render);
   },

   getTemplateFunction: function() {
      return this.template;
   },

   getTemplateData: function() {
      return this.model.attributes;
   }
});