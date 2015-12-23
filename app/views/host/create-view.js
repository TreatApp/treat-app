var CategoriesView = require('views/host/categories-view');

module.exports = Chaplin.View.extend({
   noWrap: false,
   autoRender: true,
   container: '#main-region',

   events: {
      'change #uploadFile': 'uploadFile'
   },

   initialize: function(options) {
      this.categories = options.categories;
      this.template = require('views/host/create');
      Chaplin.View.prototype.initialize.call(this, arguments);
   },

   render: function() {
      Chaplin.View.prototype.render.call(this, arguments);

      this.subview('categories', new CategoriesView({
         model: this.model,
         collection: this.categories,
         container: this.$('#categories')
      }));
   },

   getTemplateFunction: function() {
      return this.template;
   },

   getTemplateData: function() {
      return this.model.attributes;
   },

   getData: function() {
      return this.$('#eventForm').serializeJSON();
   },

   uploadFile: function(e) {
      var formData = new FormData();
      formData.append('file', e.target.files[0]);

      var progress = this.$('.progress');
      var progressBar = this.$('.progress-bar');
      progress.removeClass('hide');
      progressBar.width("0%");

      $.ajax({
         url: '/eventImage',
         type: 'POST',
         xhr: function() {
            var xhr = $.ajaxSettings.xhr();
            if (xhr.upload) {
               xhr.upload.addEventListener('progress', function(evt) {
                  var percent = (evt.loaded / evt.total) * 100;
                  progressBar.width(percent + "%");
               }, false);
            }
            return xhr;
         },
         success: function(data) {
            $("#uploadForm").trigger("reset");
            progress.addClass('hide');
            $('#image-container').append('<img src="https://treat.blob.core.windows.net/events/' + data.fileName + '" style="width: 100px; height: 100px;" class="img-thumbnail" />');
         },
         error: function() {
            $("#uploadForm").trigger("reset");
            progress.addClass('hide');
         },
         data: formData,
         cache: false,
         contentType: false,
         processData: false
      }, 'json');
   }
});