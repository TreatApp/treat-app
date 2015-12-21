module.exports = function(match){
   match('main', 'main#show');
   match('main/map', 'main#map');
   match('event/:id', 'event#show');
   match('event/:id/edit', 'event#edit');

   match('host', 'host#show');
   match('host/create', 'host#create');

   match('user', 'user#show');
   match('user/profile', 'user#viewProfile');
   match('user/profile/:id', 'user#viewProfile', {constraints: {id: /^\d+$/}});
   match('user/profile/edit', 'user#editProfile');
   match('user/bank-account', 'user#viewBankAccount');
   match('user/bank-account/edit', 'user#editBankAccount');
   match('user/credit-card', 'user#viewCreditCard');
   match('user/credit-card/edit', 'user#editCreditCard');

   match('', 'login#show');
   match(':args', 'login#show');
};
