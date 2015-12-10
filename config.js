exports.config = {
   paths: {
      public: 'www'
   },
   files: {
      javascripts: {
         joinTo: {
            "javascripts/treat.js": /^(bower_components|app)/
         }
      },
      stylesheets: {
         joinTo: {
            'stylesheets/treat.css': /^(app)/
         }
      },
      templates: {
         joinTo: "javascripts/treat.js"
      }
   },
   plugins: {
      jshint: {
         pattern: /^app\/.*\.js$/,
         options: {
            bitwise: true,
            curly: true
         },
         globals: {
            jQuery: true
         }
      }
   },
   server: {
      port: 8080,
      run: true
   }
};
