module.exports = Chaplin.View.extend({
   container: 'body',
   className: 'loading',
   autoRender: true,
   spinner: null,
   parent: null,
   delay: 200,

   initialize: function () {
      this.model = new Chaplin.Model();

      this.spinner = new Spinner({
         lines: 10,
         length: 6,
         width: 3,
         radius: 6,
         corners: 1,
         direction: 1,
         color: '#fff'
      });

      this.subscribeEvent('loading:show', _.bind(this.show, this));
      this.subscribeEvent('loading:hide', _.bind(this.hide, this));

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

   show: function() {
      this.shouldShow = true;
      setTimeout(_.bind(this.delayedShow, this), this.delay);
   },

   delayedShow: function() {
      if(this.shouldShow){
         this.$el.fadeIn(100);
         this.spinner.spin(this.$el[0]);
      }
   },

   hide: function() {
      this.shouldShow = false;
      this.spinner.stop();
      this.$el.fadeOut(100);
   }
});
