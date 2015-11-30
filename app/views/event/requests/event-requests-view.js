var EventRequestItemView = require('views/event/requests/event-request-item-view');

module.exports = Chaplin.CollectionView.extend({
   noWrap: true,
   autoRender: true,
   itemView: EventRequestItemView,
   container: '#tab-requests',
   listSelector: '#event-requests',
   animationDuration: 0,

   events: {
      'submit form': 'saveRequest'
   },

   initialize: function() {
      this.template = require('views/event/requests/event-requests');
      Chaplin.CollectionView.prototype.initialize.call(this, arguments);
   },

   getTemplateFunction: function() {
      return this.template;
   },

   getTemplateData: function() {
      return this.model.attributes;
   },

   saveRequest: function(e) {
      e.preventDefault();
      var data = this.$('form').serializeJSON();
      this.trigger('save', data);
   }
});