module.exports = Chaplin.View.extend({
   noWrap: true,
   autoRender: true,

   events: {
      'click a': 'saveRating',
      'mouseover a': 'hoverRating',
      'mouseout a': 'cancelHover'
   },

   initialize: function(options) {
      this.rating = parseInt(options.rating);
      this.template = options.setRating ? require('views/rating/set-rating') : require('views/rating/view-rating');
      Chaplin.View.prototype.initialize.call(this, arguments);
   },

   render: function() {
      Chaplin.View.prototype.render.call(this, arguments);
      this.fillRating(this.rating);
   },

   getTemplateFunction: function() {
      return this.template;
   },

   getTemplateData: function() {
      return this.model.attributes;
   },

   hoverRating: function(e) {
      var rating = $(e.currentTarget).data('rating');
      this.fillRating(parseInt(rating));
   },

   cancelHover: function(e) {
      this.fillRating(this.rating);
   },

   fillRating: function(rating) {
      this.$('a, span').each(function() {
         var filled = parseInt($(this).data('rating')) <= rating;
         $(this).children('i').toggleClass('rating-empty', !filled).toggleClass('rating-filled', filled);
      });
   },

   saveRating: function(e) {
      e.preventDefault();
      var data = {
         userId:  this.model.get('user').id,
         rating: $(e.currentTarget).data('rating')
      };
      this.trigger('saveRating', JSON.stringify(data));
   }
});