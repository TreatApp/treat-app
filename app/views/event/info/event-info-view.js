var RatingView = require('views/rating/rating-view');

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
   },

   render: function() {
      Chaplin.View.prototype.render.call(this, arguments);

      var ratingView = new RatingView({
         model: this.model,
         container: this.$('#event-rating')
      });
      this.subview('rating', ratingView);
      this.listenTo(ratingView, 'saveRating', _.bind(this.saveRating, this));
   },

   saveRating: function(data) {
      console.log('save rating', data);
   }
});