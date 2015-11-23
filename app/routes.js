module.exports = function(match){
   match('', 'main#show');
   match('main/map', 'main#map');
   match('host', 'host#show');
   match('host/create', 'host#create');
   match('user', 'user#show');
   match('user/edit', 'user#edit');
   match(':args', 'main#show');
};
