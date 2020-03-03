const mongoose = require('mongoose')
const PoinSchema = require('./utils/PointSchema')
// Schema é a estruturação dentro do banco de dados
const DevSchema = new mongoose.Schema({
    name: String,
    github_username: String,
    bio: String,
    avatar_url: String,
    techs: [String], // varias tecnologias, logo array
    location: {
        type: PoinSchema,
        index: '2dsphere' // esfera 2D , padrão quando usa geolocalização
    }
})
// Esse 'Dev' é o nome do banco quando for criado
module.exports = mongoose.model('Dev' , DevSchema)

// Model já está funcional !