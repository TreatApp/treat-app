var NavView = require('views/nav/nav-view');

module.exports = Chaplin.Controller.extend({
   initialize: function (options) {
      this.model = new Chaplin.Model();

      this.collection = new Chaplin.Collection([
         { action: 'eat', icon: 'cutlery' },
         { action: 'host', icon: 'home' },
         { action: 'user', icon: 'user' }
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