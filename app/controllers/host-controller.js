var NavController = require('controllers/nav-controller');
var HostView = require('views/host/host-view');
var EventModel = require('models/event-model');
var CategoriesCollection = require('collections/categories-collection');

module.exports = Chaplin.Controller.extend({
   show: function (params, options) {
      this.model = new EventModel();
      this.categories = new CategoriesCollection();

      this.nav = new NavController(options);

      this.categories.fetch({
         success: _.bind(this.showHost, this)
      });
   },

   showHost: function() {
      this.view = new HostView({
         model: this.model,
         categories: this.categories
      });
   }
});