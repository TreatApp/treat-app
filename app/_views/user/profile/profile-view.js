var RatingView = require('views/rating/rating-view');

module.exports = Chaplin.View.extend({
   noWrap: true,
   autoRender: true,
   container: '#main-region',

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

   render: function() {
      Chaplin.View.prototype.render.call(this, arguments);

      var ratingView = new RatingView({
         model: this.model,
         container: this.$('#user-rating'),
         rating: this.model.get('rating')
      });
      this.subview('rating', ratingView);
   }
});