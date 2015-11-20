module.exports = function(match){
   match('', 'main#show');
   match('host', 'host#show');
   match('user', 'user#show');
   match(':args', 'main#show');
};
