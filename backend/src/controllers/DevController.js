const axios = require('axios')
const Dev = require('../models/Dev')
// recebe as requisições e Guarda as info no banco de dados
// Controller tem geralmente 5 funções: show(mostra apenas 1) , index(mostra uma lista dev), store, update, destroy
module.exports = {

    async index(request, response){
        const devs = await Dev.find() // lista TODOS os usúarios no banco
        return response.json(devs)
    },

    async store(request, response)  {
        console.log(request.body)
        const { github_username , techs , latitude , longitude} = request.body // mandado pelo imnsonia github username  e as tecnologias do usuario
        
        let dev = await Dev.findOne({github_username})//procura o usuario no banco
        if(!dev){ // se não existe, coloque no banco. Evita replica no banco
            const tec_array = techs.split(',').map(tech => tech.trim()) // trim remove espaçamentos antes ou dps da string
            //recebe info da api do git
            const Api_response = await axios.get(`https://api.github.com/users/${github_username}`)
            console.log(Api_response.data)
            let {name , bio , avatar_url } = Api_response.data
        
            if(!name) { name = Api_response.data.login } // pois login é obrigatório
            console.log(name , bio , avatar_url , github_username)
        
            // nome DEVE ser igual a base de dados sempre (/models/Dev.js),
            const location = {
                type: 'Point',
                coordinates: [longitude , latitude],
            }
        
             dev = await Dev.create({ // salva numa variavel para ter o retorno do banco de dados
                name,
                github_username,
                bio,
                avatar_url,
                techs: tec_array,
                location,
            }) 
        }
       
        // usa-se .json nas respostas sempre!!! para ocorrer a comunicação do back com o FRONT END
        //return response.json({message: "Hello Omnistack!! HEHEHE"}) // ele envia objeto !!
        return response.json(dev) // retorna info do banco de dados !!
    }
}