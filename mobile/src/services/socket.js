import socketio from  'socket.io-client'

const socket = socketio('http://192.168.1.196:3333', {
    autoConnect: false , 
})

function subscribeToNewDevs(subscribefunction){
    socket.on('novo_dev' , subscribefunction)
}

function connect(latitude , longitude , techs){
    socket.io.opts.query = { // envia pro backends essas informações
        latitude,
        longitude,
        techs,
    }
    socket.connect()

    socket.on('message' , text => { // escutando 
        console.log(text) // msg aparece na tela da web (Expo)
    })
}
function disconnect (){
    if(socket.connect){
        socket.disconnect()
    }
}

export {
    connect,
    disconnect,
    subscribeToNewDevs,
}