const mongoose = require('mongoose')
//é um banco criado para a localização do usúario
const PointSchema = new mongoose.Schema({ 
    type: { 
        type: String,
        enum: ['Point'],
        require: true, // é obrigatório
    },
    coordinates: { // guarda latitude e longitude
        type: [Number],
        require: true, // é obrigatório

    },
})

module.exports = PointSchema