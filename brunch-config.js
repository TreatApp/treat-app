exports.config = {
   npm: {
      enabled: true
   },
   paths: {
      public: 'www'
   },
   files: {
      javascripts: {
         joinTo: 'javascripts/treat.js'
      },
      stylesheets: {
         joinTo: 'stylesheets/treat.css'
      }
   },
   plugins: {
      babel: {
         presets: ['es2015', 'react', 'stage-1'],
         pattern: /\.(es6|jsx|js)$/
      }
   },
   server: {
      hostname: '0.0.0.0',
      port: 8888,
      run: true
   }
};
