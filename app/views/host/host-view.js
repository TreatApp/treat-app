var CategoriesView = require('views/host/categories-view');

module.exports = Chaplin.View.extend({
   noWrap: false,
   autoRender: true,
   container: '#main-region',

   events: {
      'submit form': 'createEvent'
   },

   initialize: function(options) {
      this.categories = options.categories;
      this.template = require('views/host/host');
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

   createEvent: function(e) {
      e.preventDefault();

      $.ajax({
         type: 'post',
         dataType: 'json',
         contentType: 'application/json; charset=UTF-8',
         url: '/events',
         data: this.$('form').serializeJSON(),
         success: _.bind(this.success, this),
         error: _.bind(this.error, this)
      });
   },

   success: function() {
      console.log("SUCCESS!");
   },

   error: function() {
      console.log("ERROR!");
   }
});