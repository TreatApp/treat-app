var HeaderView = require('views/event/header-view');
var EventView = require('views/event/event-view');
var EditEventView = require('views/event/edit-event-view');
var EventInfoView = require('views/event/info/event-info-view');
var EventLogView = require('views/event/log/event-log-view');
var EventRequestsView = require('views/event/requests/event-requests-view');
var EventModel = require('models/event-model');
var EventLogCollection = require('collections/event-logs-collection');
var EventRequestCollection = require('collections/event-requests-collection');
var EventRatingsCollection = require('collections/event-ratings-collection');
var UserRatingsCollection = require('collections/user-ratings-collection');

module.exports = Chaplin.Controller.extend({
   show: function (params, options) {
      this.model = new EventModel({ id: params.id });

      this.eventLogs = new EventLogCollection();
      this.eventLogs.eventId = params.id;

      this.eventRequests = new EventRequestCollection();
      this.eventRequests.eventId = params.id;

      this.eventRatings = new EventRatingsCollection();
      this.eventRatings.eventId = params.id;

      this.userRatings = new UserRatingsCollection();
      this.userRatings.eventId = params.id;

      this.model.set('edit', false);
      this.headerView = new HeaderView({
         model: this.model
      });

      this.view = new EventView({
         model: this.model
      });

      this.model.fetch({
         success: _.bind(this.showEventInfo, this)
      });
      this.eventLogs.fetch({
         success: _.bind(this.showEventLog, this)
      });
      this.eventRequests.fetch({
         success: _.bind(this.showEventRequests, this)
      });

      this.subscribeEvent('updateRequest', _.bind(this.updateRequest, this));
      this.subscribeEvent('saveUserRating', _.bind(this.saveUserRating, this));
   },

   edit: function (params, options) {
      this.model = new EventModel({ id: params.id });

      this.model.set('edit', true);
      this.headerView = new HeaderView({
         model: this.model
      });
      this.listenTo(this.headerView, 'save', this.saveEvent);

      this.model.fetch({
         success: _.bind(this.showEditEvent, this)
      });
   },

   showEditEvent: function() {
      this.view = new EditEventView({
         model: this.model
      });
   },

   showEventInfo: function() {
      this.eventInfoView = new EventInfoView({
         model: this.model
      });
      this.listenTo(this.eventInfoView, 'saveEventRating', this.saveEventRating);
   },

   showEventLog: function() {
      this.eventLogView = new EventLogView({
         model: this.model,
         collection: this.eventLogs
      });
      this.listenTo(this.eventLogView, 'save', this.saveLog);
   },

   showEventRequests: function() {
      this.eventRequestsView = new EventRequestsView({
         model: this.model,
         collection: this.eventRequests
      });
      this.listenTo(this.eventRequestsView, 'save', this.saveRequest);
   },

   saveEvent: function() {
      var data = this.view.getData();
      $.ajax({
         type: 'put',
         dataType: 'json',
         contentType: 'application/json; charset=UTF-8',
         url: this.model.url(),
         data: data,
         success: _.bind(this.saveEventSuccess, this)
      });
   },

   saveEventSuccess: function() {
      Chaplin.utils.redirectTo({ url: '/event/' + this.model.id });
   },

   saveLog: function(data) {
      $.ajax({
         type: 'post',
         dataType: 'json',
         contentType: 'application/json; charset=UTF-8',
         url: this.eventLogs.url(),
         data: data,
         success: _.bind(this.saveLogSuccess, this)
      });
   },

   saveLogSuccess: function() {
      this.eventLogs.fetch();
   },

   saveRequest: function(data) {
      $.ajax({
         type: 'post',
         dataType: 'json',
         contentType: 'application/json; charset=UTF-8',
         url: this.eventRequests.url(),
         data: data,
         success: _.bind(this.saveRequestSuccess, this)
      });
   },

   updateRequest: function(data) {
      $.ajax({
         type: 'put',
         dataType: 'json',
         contentType: 'application/json; charset=UTF-8',
         url: this.eventRequests.url(),
         data: data,
         success: _.bind(this.saveRequestSuccess, this)
      });
   },

   saveRequestSuccess: function() {
      this.eventRequests.fetch();
   },

   saveEventRating: function(data) {
      $.ajax({
         type: 'post',
         dataType: 'json',
         contentType: 'application/json; charset=UTF-8',
         url: this.eventRatings.url(),
         data: data,
         success: _.bind(this.saveEventRatingSuccess, this)
      });
   },

   saveEventRatingSuccess: function() {
      this.model.fetch();
   },

   saveUserRating: function(data) {
      $.ajax({
         type: 'post',
         dataType: 'json',
         contentType: 'application/json; charset=UTF-8',
         url: this.userRatings.url(),
         data: data,
         success: _.bind(this.saveRequestSuccess, this)
      });
   }
});