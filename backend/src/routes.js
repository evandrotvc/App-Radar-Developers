// separando as rotas
const { Router} = require('express')
const DevController = require('./controllers/DevController')
const SearchController = require('./controllers/SearchController')
// agora tem acesso a todos requisições do http: routes.get , routes.put ...
const routes = Router() 

// Busca no banco
routes.get('/devs' , DevController.index)
// Preenche e guarda no banco
routes.post('/devs', DevController.store)
//routes.put('/devs', DevController.update)

routes.get('/search' , SearchController.index)// busca apenas um usuario

// agora esse objeto será exportado e toda aplicação reconhece ele  agora
module.exports = routes; 

// OBS: Para saber se foi cadastrado tudo no mongoose, o imnsonia mostra um id e __v , 
//indicando o identificador daquele dados e __v é o versionamento indicando a qtd de alterações q esse dado sofre
//então, a cada alteração, __v++

//http://portquiz.net:27017/ url padrão do mongodb para saber se está funcionando