module.exports = Chaplin.View.extend({
   noWrap: true,
   autoRender: true,
   container: '#main-region',

   events: {
      'submit form': 'createEvent'
   },

   initialize: function() {
      this.template = require('views/host/host');
      Chaplin.View.prototype.initialize.call(this, arguments);
   },

   getTemplateFunction: function() {
      return this.template;
   },

   getTemplateData: function() {
      return this.model.attributes;
   },

   createEvent: function(e) {
      e.preventDefault();

      var data = this.$('form').serializeArray();

      console.log('ok lets post this shit!', data);

      $.ajax({
         type: 'post',
         dataType: 'json',
         contentType: 'application/json; charset=UTF-8',
         url: '/events',
         data: JSON.stringify(data),
         success: _.bind(this.success, this),
         error: _.bind(this.error, this)
      });
   },

   success: function() {
      console.log("SUCCESS!");
   },

   error: function() {
      console.log("ERROR!");
   }
});