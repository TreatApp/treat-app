var NavController = require('controllers/nav-controller');
var HeaderView = require('views/host/header-view');
var HostView = require('views/host/host-view');
var CreateView = require('views/host/create-view');
var EventModel = require('models/event-model');
var CategoriesCollection = require('collections/categories-collection');

module.exports = Chaplin.Controller.extend({
   show: function (params, options) {
      this.model = new EventModel();

      this.nav = new NavController(options);

      this.model.set('edit', false);
      this.headerView = new HeaderView({
         model: this.model
      });

      this.showHost();
   },

   create: function(params, options) {
      this.model = new EventModel();
      this.categories = new CategoriesCollection();

      this.nav = new NavController(options);

      this.model.set('edit', true);
      this.headerView = new HeaderView({
         model: this.model
      });
      this.listenTo(this.headerView, 'save', this.createEvent);

      this.categories.fetch({
         success: _.bind(this.showCreate, this)
      });
   },

   showHost: function() {
      this.view = new HostView({
         model: this.model
      });
   },

   showCreate: function() {
      this.view = new CreateView({
         model: this.model,
         categories: this.categories
      });
   },

   createEvent: function() {
      var data = this.view.getData();
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
      Chaplin.utils.redirectTo({ url: '/host' });
   }
});