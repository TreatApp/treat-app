var Auth = require('utils/auth');

module.exports = Chaplin.Controller.extend({
   beforeAction: function() {
       Auth.check();
   }
});