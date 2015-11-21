var CategoryItemView = require('views/host/category-item-view');

module.exports = Chaplin.CollectionView.extend({
   noWrap: true,
   autoRender: true,
   itemView: CategoryItemView,
   animationDuration: 0,

   initialize: function () {
      console.log('show categories view', this.collection);
      this.template = require('views/host/categories');
      Chaplin.CollectionView.prototype.initialize.call(this, arguments);
   },

   getTemplateFunction: function () {
      return this.template;
   },

   getTemplateData: function () {
      return this.model.attributes;
   }
});