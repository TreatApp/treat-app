module.exports = {

   initialize: function(options) {
       braintree.setup(options.token, "dropin", {
           container: options.container,
           onPaymentMethodReceived: options.submit
       });
   }

};
