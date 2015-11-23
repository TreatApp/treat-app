var CategoriesView = require('views/host/categories-view');

module.exports = Chaplin.View.extend({
   noWrap: false,
   autoRender: true,
   container: '#main-region',

   initialize: function(options) {
      this.template = require('views/host/host');
      Chaplin.View.prototype.initialize.call(this, arguments);
   },

   getTemplateFunction: function() {
      return this.template;
   },

   getTemplateData: function() {
      return this.model.attributes;
   }
});