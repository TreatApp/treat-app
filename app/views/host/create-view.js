var CategoriesView = require('views/host/categories-view');

module.exports = Chaplin.View.extend({
   noWrap: false,
   autoRender: true,
   container: '#main-region',

   initialize: function(options) {
      this.categories = options.categories;
      this.template = require('views/host/create');
      Chaplin.View.prototype.initialize.call(this, arguments);
   },

   render: function() {
      Chaplin.View.prototype.render.call(this, arguments);

      this.subview('categories', new CategoriesView({
         model: this.model,
         collection: this.categories,
         container: this.$('#categories')
      }));
   },

   getTemplateFunction: function() {
      return this.template;
   },

   getTemplateData: function() {
      return this.model.attributes;
   },

   getData: function() {
      return this.$('form').serializeJSON();
   }
});