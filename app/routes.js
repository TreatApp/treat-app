module.exports = function(match){
   match('', 'main#show');
   match('user', 'user#show');
   match(':args', 'main#show');
};
