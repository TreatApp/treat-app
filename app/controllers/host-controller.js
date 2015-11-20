var NavController = require('controllers/nav-controller');
var HostView = require('views/host/host-view');
var EventModel = require('models/event-model');

module.exports = Chaplin.Controller.extend({
   show: function (params) {
      this.model = new EventModel();

      this.nav = new NavController();

      this.view = new HostView({
         model: this.model
      });
   }
});