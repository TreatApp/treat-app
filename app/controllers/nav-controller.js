var NavView = require('views/nav/nav-view');

module.exports = Chaplin.Controller.extend({
   initialize: function (options) {
      this.model = options.model;

      this.collection = new Chaplin.Collection([
         { action: 'eat', icon: 'cutlery' },
         { action: 'host', icon: 'home' },
         { action: 'profile', icon: 'user' }
      ]);

      this.view = new NavView({
         model: this.model,
         collection: this.collection
      });

      this.subscribeEvent('navigate', this.navigate);
   },

   navigate: function(action) {
      this.publishEvent('nav:' + action);
   }
});