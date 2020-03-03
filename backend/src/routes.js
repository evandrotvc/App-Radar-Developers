// separando as rotas
const { Router} = require('express')
const DevController = require('./controllers/DevController')
// agora tem acesso a todos requisições do http: routes.get , routes.put ...
const routes = Router() 

// Busca no banco
routes.get('/devs' , DevController.index)
// Preenche e guarda no banco
routes.post('/devs', DevController.store)


// agora esse objeto será exportado e toda aplicação reconhece ele  agora
module.exports = routes; 

// OBS: Para saber se foi cadastrado tudo no mongoose, o imnsonia mostra um id e __v , 
//indicando o identificador daquele dados e __v é o versionamento indicando a qtd de alterações q esse dado sofre
//então, a cada alteração, __v++