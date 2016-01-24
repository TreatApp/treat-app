var RatingView = require('views/rating/rating-view');

module.exports = Chaplin.View.extend({
   noWrap: true,
   autoRender: true,

   events: {
      'click .js-approve': 'approveRequest',
      'click .js-decline': 'declineRequest'
   },

   initialize: function() {
      this.template = require('views/event/requests/event-request-item');
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
         container: this.$('.user-rating'),
         setRating: true
      });
      this.subview('rating', ratingView);
      this.listenTo(ratingView, 'saveRating', _.bind(this.saveRating, this));
   },

   saveRating: function(data) {
      this.publishEvent('saveUserRating', data);
   },

   approveRequest: function(e) {
      e.preventDefault();
      var data = {
         user: {
            id:  this.model.get('user').id
         },
         status: 1
      };
      this.publishEvent('updateRequest', JSON.stringify(data));
   },

   declineRequest: function(e) {
      e.preventDefault();
      var data = {
         user: {
            id:  this.model.get('user').id
         },
         status: 2
      };
      this.publishEvent('updateRequest', JSON.stringify(data));
   }
});