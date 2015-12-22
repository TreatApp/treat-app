module.exports = {

   initialize: function(token, container) {
       console.log('Initialize braintree with token', token);
       braintree.setup(token, "custom", {
           container: container
       });
   }

};
