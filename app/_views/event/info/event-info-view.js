var RatingView = require('views/rating/rating-view');

module.exports = Chaplin.View.extend({
   noWrap: false,
   autoRender: true,
   container: '#tab-info',

   events: {
      'submit form': 'saveRequest'
   },

   initialize: function() {
      this.template = require('views/event/info/event-info');
      Chaplin.View.prototype.initialize.call(this, arguments);
   },

   getTemplateFunction: function() {
      return this.template;
   },

   getTemplateData: function() {
      var data = this.model.attributes;
      data.view = {
         canRequest: true
      };
      return data;
   },

   render: function() {
      Chaplin.View.prototype.render.call(this, arguments);

      var ratingView = new RatingView({
         model: this.model,
         container: this.$('#event-rating'),
         rating: this.model.get('user').rating
      });
      this.subview('rating', ratingView);
   },

   saveRequest: function(e) {
      e.preventDefault();
      var data = { status: 0 };
      this.trigger('saveRequest', JSON.stringify(data));
   }
});