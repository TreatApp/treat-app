var EventLogItemView = require('views/event/log/event-log-item-view');

module.exports = Chaplin.CollectionView.extend({
   noWrap: true,
   autoRender: true,
   itemView: EventLogItemView,
   container: '#tab-log',
   listSelector: '#event-logs',
   animationDuration: 0,

   events: {
      'submit form': 'saveLog'
   },

   initialize: function() {
      this.template = require('views/event/log/event-log');
      Chaplin.CollectionView.prototype.initialize.call(this, arguments);
   },

   getTemplateFunction: function() {
      return this.template;
   },

   getTemplateData: function() {
      return this.model.attributes;
   },

   saveLog: function(e) {
      e.preventDefault();
      var data = this.$('form').serializeJSON();
      this.trigger('save', data);
   }
});