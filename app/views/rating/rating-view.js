module.exports = Chaplin.View.extend({
   noWrap: true,
   autoRender: true,

   events: {
      'click a': 'saveRating',
      'mouseover a': 'hoverRating',
      'mouseout': 'cancelHover'
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

   hoverRating: function(e) {
      var rating = $(e.currentTarget).data('rating');
      this.$('a').each(function() {
         var filled = parseInt($(this).data('rating')) <= rating;
         $(this).children('i').toggleClass('rating-empty', !filled).toggleClass('rating-filled', filled);
      });
   },

   cancelHover: function(e) {
      this.$('a').each(function() {
         $(this).children('i').toggleClass('rating-empty', true).toggleClass('rating-filled', false);
      });
   },

   saveRating: function(e) {
      e.preventDefault();
      var data = {
         rating: $(e.currentTarget).data('rating')
      };
      this.trigger('saveRating', JSON.stringify(data));
   }
});