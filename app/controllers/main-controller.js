var EventsCollection = require('collections/events-collection');
var NavController = require('controllers/nav-controller');
var HeaderView = require('views/main/header-view');
var MainView = require('views/main/main-view');
var MapView = require('views/main/map-view');

module.exports = Chaplin.Controller.extend({
   show: function (params, options) {
      this.model = new Chaplin.Model();
      this.collection = new EventsCollection();

      this.nav = new NavController(options);

      this.model.set('map', false);
      this.headerView = new HeaderView({
         model: this.model
      });

      this.view = new MainView({
         model: this.model,
         collection: this.collection
      });

      this.collection.fetch();
   },

   map: function (params, options) {
      this.model = new Chaplin.Model();

      this.nav = new NavController(options);

      this.model.set('map', true);
      this.headerView = new HeaderView({
         model: this.model
      });

      this.view = new MapView({
         model: this.model
      });
   }
});