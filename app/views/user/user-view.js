var UserItemView = require('./user-item-view');

module.exports = Chaplin.CollectionView.extend({
   noWrap: true,
   autoRender: true,
   itemView: UserItemView,
   container: '#main-region',
   animationDuration: 0,

   initialize: function () {
      this.template = require('./user');
      Chaplin.CollectionView.prototype.initialize.call(this, arguments);
   },

   getTemplateFunction: function () {
      return this.template;
   },

   getTemplateData: function () {
      return this.model.attributes;
   }
});