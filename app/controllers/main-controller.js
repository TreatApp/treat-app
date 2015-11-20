var EventsCollection = require('collections/events-collection');
var NavController = require('controllers/nav-controller');
var MainView = require('views/main/main-view');

module.exports = Chaplin.Controller.extend({
   show: function (params) {
      this.model = new Chaplin.Model();
      this.collection = new EventsCollection();

      this.nav = new NavController({ model: this.model });

      this.view = new MainView({
         model: this.model,
         collection: this.collection
      });

      this.collection.fetch();
   }
});