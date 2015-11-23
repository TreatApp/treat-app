var NavController = require('controllers/nav-controller');
var HeaderView = require('views/host/header-view');
var HostView = require('views/host/host-view');
var EventModel = require('models/event-model');
var CategoriesCollection = require('collections/categories-collection');

module.exports = Chaplin.Controller.extend({
   show: function (params, options) {
      this.model = new EventModel();
      this.categories = new CategoriesCollection();

      this.nav = new NavController(options);

      this.headerView = new HeaderView({
         model: this.model
      });

      this.categories.fetch({
         success: _.bind(this.showHost, this)
      });
   },

   showHost: function() {
      this.view = new HostView({
         model: this.model,
         categories: this.categories
      });
      this.listenTo(this.view, 'createEvent', this.createEvent);
   },

   createEvent: function(data) {
      $.ajax({
         type: 'post',
         dataType: 'json',
         contentType: 'application/json; charset=UTF-8',
         url: '/events',
         data: data,
         success: _.bind(this.success, this)
      });
   },

   success: function() {
      alert("Ditt evenemang har skapats!");
   }
});