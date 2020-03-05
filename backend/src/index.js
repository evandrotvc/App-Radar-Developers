/*Tipos de parâmetros do express : 
(get )Query params: request.query (uso para: Filtros , ordenação , paginação)
(put, delete) Route params: request.params (uso : Identificar um recurso na alteração ou na remoção)
body: request.body (uso: Dados para criação ou alteração de um registro)
**/
// ___________________________________________

// Importante
// app.use() -> faço modificações que são válidas paras todas as ROTAS DA APLICAÇÃO

// ---> acessar : http://portquiz.net:27017/   <- PORTA PADRÃO DO MONGODB !!!


// toda vez q cria um back-end temos rotas , e aí que o express entra, ele cria essas rotas da nossa aplicação
const express = require('express');
const mongoose = require('mongoose')
const routes = require('./routes') // importa as rotas
const cors = require('cors')
//pega a resposta quando acessa a web
const app = express();
// link pegado do site mongodb atlas criado para esa apliacação
mongoose.connect('mongodb+srv://omnistack:omnistack@cluster0-undq9.mongodb.net/week10?retryWrites=true&w=majority' , {
    useNewUrlParser: true, // linha 20 e 21 são para tirar avisos do terminal
    useUnifiedTopology: true, 
})
app.use(cors()) // libera o acesso pra todo tipo de aplicação, REACT pode agir agora
app.use(express.json()) // Express entende agora requisições q tem JSON(formato)

// se quisesse acessar www.omnistack.com/users , com o comando abaixo , quando entrasse no localhost, acessaria essa campo de usuarios
// app.get('/users')

// Usaremos mongoDB (Não relacional ou poucos relacionamentos)
app.use(routes) // agora todas rotas da aplicação estão cadastradas

app.listen(3333)