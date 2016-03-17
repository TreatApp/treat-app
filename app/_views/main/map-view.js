module.exports = Chaplin.View.extend({
   noWrap: true,
   autoRender: true,
   container: '#main-region',

   initialize: function() {
      this.template = require('views/main/map');
      Chaplin.View.prototype.initialize.call(this, arguments);
   },

   getTemplateFunction: function() {
      return this.template;
   },

   getTemplateData: function() {
      return this.model.attributes;
   },

   render: function() {
      Chaplin.View.prototype.render.call(this, arguments);

      var container = this.el;
      var properties = {
         center: new google.maps.LatLng(59.32932, 18.06858),
         mapTypeId: google.maps.MapTypeId.ROADMAP,
         zoom: 12
      };
      _.defer(function() {
         new google.maps.Map(container, properties);
      });
   }
});