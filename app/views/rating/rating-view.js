module.exports = Chaplin.View.extend({
   noWrap: true,
   autoRender: true,

   events: {
      'click a': 'saveRating'
   },

   initialize: function() {
      this.template = require('views/rating/rating');
      Chaplin.View.prototype.initialize.call(this, arguments);
   },

   getTemplateFunction: function() {
      return this.template;
   },

   getTemplateData: function() {
      return this.model.attributes;
   },

   saveRating: function(e) {
      e.preventDefault();
      var data = {
         rating: $(e.currentTarget).data('rating')
      };
      this.trigger('saveRating', data);
   }
});