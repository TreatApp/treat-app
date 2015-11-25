var HeaderView = require('views/event/header-view');
var EventView = require('views/event/event-view');
var EventModel = require('models/event-model');

module.exports = Chaplin.Controller.extend({
   show: function (params, options) {
      this.model = new EventModel({ id: params.id });

      this.headerView = new HeaderView({
         model: this.model
      });

      this.model.fetch({
         success: _.bind(this.showEvent, this)
      });
   },

   showEvent: function() {
      this.view = new EventView({
         model: this.model
      });
   }
});