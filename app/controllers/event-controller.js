var HeaderView = require('views/event/header-view');
var EventView = require('views/event/event-view');
var EventLogView = require('views/event/log/event-log-view');
var EventRequestsView = require('views/event/requests/event-requests-view');
var EventModel = require('models/event-model');
var EventLogCollection = require('collections/event-logs-collection');
var EventRequestCollection = require('collections/event-requests-collection');

module.exports = Chaplin.Controller.extend({
   show: function (params, options) {
      this.model = new EventModel({ id: params.id });

      this.eventLogs = new EventLogCollection();
      this.eventLogs.eventId = params.id;

      this.eventRequests = new EventRequestCollection();
      this.eventRequests.eventId = params.id;

      this.headerView = new HeaderView({
         model: this.model
      });

      this.eventLogView = new EventLogView({
         model: this.model,
         collection: this.eventLogs
      });

      this.eventRequestsView = new EventRequestsView({
         model: this.model,
         collection: this.eventRequests
      });

      this.model.fetch({
         success: _.bind(this.showEvent, this)
      });

      this.eventLogs.fetch();
      this.eventRequests.fetch();
   },

   showEvent: function() {
      this.view = new EventView({
         model: this.model
      });
   }
});