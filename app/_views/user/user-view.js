var UserItemView = require('./user-item-view');

module.exports = Chaplin.CollectionView.extend({
   noWrap: true,
   autoRender: true,
   itemView: UserItemView,
   listSelector: '.list-group',
   container: '#main-region',
   animationDuration: 0,

   events: {
      'click .js-logout': 'logout'
   },

   initialize: function () {
      this.template = require('./user');
      Chaplin.CollectionView.prototype.initialize.call(this, arguments);
   },

   getTemplateFunction: function () {
      return this.template;
   },

   getTemplateData: function () {
      return this.model.attributes;
   },

   logout: function(e) {
      e.preventDefault();
      this.trigger('logout');
   }
});