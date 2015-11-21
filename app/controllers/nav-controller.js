var NavView = require('views/nav/nav-view');

module.exports = Chaplin.Controller.extend({
   initialize: function (options) {
      this.model = new Chaplin.Model();

      this.collection = new Chaplin.Collection([
         { action: 'main', icon: 'cutlery', active: false },
         { action: 'host', icon: 'home', active: false },
         { action: 'user', icon: 'user', active: false }
      ]);

      this.view = new NavView({
         model: this.model,
         collection: this.collection
      });

      this.collection.findWhere({action: options.controller}).set('active', true);
   }
});