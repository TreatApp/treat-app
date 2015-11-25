var EventLogItemView = require('views/event/log/event-log-item-view');

module.exports = Chaplin.CollectionView.extend({
   noWrap: true,
   autoRender: true,
   itemView: EventLogItemView,
   container: '#main-region',
   listSelector: '#event-logs',
   animationDuration: 0,

   initialize: function() {
      this.template = require('views/event/log/event-log');
      Chaplin.CollectionView.prototype.initialize.call(this, arguments);
   },

   getTemplateFunction: function() {
      return this.template;
   },

   getTemplateData: function() {
      return this.model.attributes;
   }
});