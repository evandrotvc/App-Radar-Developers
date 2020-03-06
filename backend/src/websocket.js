const socketio = require('socket.io')
const calculateDistance = require('./utils/calculateDistance')

let io
const connections = [] // armazena todas as coneções que a aplicação teve

//criand um método
exports.setupWebsocket = (server) => {
 //   console.log("OK")
     io = socketio(server)

    io.on('connection' , socket =>{ //ouve um evento quando user conecta no server via websocket
        // esse trecho  executa apenas na conexão de um novo cliente
        const {latitude , longitude , techs} = socket.handshake.query
        console.log(socket.id)
        console.log(socket.handshake.query) // mostra os parametros que a gente envia pelo frontend

       // const tec_array = techs.split(',').map(tech => tech.trim()) 
        connections.push({
            id: socket.id,
            coordinates: {
                latitude: Number(latitude),
                longitude: Number(longitude),
              },
              techs: techs.split(',').map(tech => tech.trim()) ,

        })

        setTimeout(() => { // dps de 3 segundos , emitir uma msg para o socket
            socket.emit('message' , 'Hello Omnistack') // Backend enviando info pro front, sem haver requisição
        },3000)
    }) 
}


//criando método findcon... que vai fazer os  FILTROS
exports.findConnection = (coordinates , techs ) => {
    return connections.filter(connections => { // calcula dist entre 2 pontos usando lat e long menor que 10km
        return calculateDistance(coordinates , connection.coordinates) < 10 &&
        connection.techs.some(item => techs.includes(item)) // verifica se o dev tem pelo menos 1 tecnologia buscada
    })
}

exports.sendMessage = (to , message , data) => {
    to.forEach( connection => {
        io.to(connection.id).emit(message , data)
    });
}