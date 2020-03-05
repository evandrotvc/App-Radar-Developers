const Dev = require('../models/Dev')
module.exports = {
    async index(request, response ) {
        // OBJETIVO: Buscar todos Dev num raio de 10km
        // Filtrar por Tecnologias. Ou seja, 1 filtro pra geolocalização e 1 filtro por tecnologias
        const {  latitude , longitude , techs } = request.query

        // pega o vetor de tecnologias
        const techs_array = techs.split(',').map(tech => tech.trim()) // trim remove espaçamentos antes ou dps da string
        //console.log(request.query) // info das query vem do imnsonia que preenchamos no campo query

        const devs = await Dev.find({
            techs: { //$in é um operador do mongoDb. Filtro pronto de tecnologias
                $in: techs_array, // FILTRA users que possuem as tecnologias do vetor
            },
            location: {
                $near: { // near encontra users próximos da sua coordenada
                    $geometry: {
                        type: 'Point', // point tem um Type e uma coordenada
                        coordinates: [longitude , latitude],// mongo segue nessa ordem long e dps latitute
                    },
                    $maxDistance: 10000, // users mais proximos no raio de 10 km
                },
            },
        })
        
        return response.json({devs })
    }
}