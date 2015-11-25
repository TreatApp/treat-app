var HeaderView = require('views/event/header-view');
var EventView = require('views/event/event-view');
var EventLogView = require('views/event/event-log-view');
var EventModel = require('models/event-model');
var EventLogCollection = require('collections/event-logs-collection');

module.exports = Chaplin.Controller.extend({
   show: function (params, options) {
      this.model = new EventModel({ id: params.id });
      this.eventLogs = new EventLogCollection({ id: params.id });

      this.headerView = new HeaderView({
         model: this.model
      });

      this.eventLogView = new EventLogView({
         model: this.model,
         collection: this.eventLogs
      });

      this.model.fetch({
         success: _.bind(this.showEvent, this)
      });

      this.eventLogs.fetch();
   },

   showEvent: function() {
      this.view = new EventView({
         model: this.model
      });
   }
});