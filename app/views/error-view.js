module.exports = Chaplin.View.extend({
   container: 'body',
   className: 'error',
   autoRender: true,
   delay: 200,

   initialize: function () {
      this.model = new Chaplin.Model();

      this.subscribeEvent('error:show', _.bind(this.show, this));

      Chaplin.View.prototype.initialize.call(this, arguments);
   },

   render: function() {
      Chaplin.View.prototype.render.call(this, arguments);
      this.$el.hide();
   },

   getTemplateFunction: function() {
      return null;
   },

   getTemplateData: function() {
      return null;
   },

   show: function(content) {
      this.$el.text(content);
      this.$el.fadeIn(100);
      setTimeout(_.bind(this.hide, this), 2000);
   },

   hide: function() {
      this.$el.fadeOut(500);
   }
});
