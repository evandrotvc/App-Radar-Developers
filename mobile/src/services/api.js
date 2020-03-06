import axios from 'axios'

const api = axios.create({ //192.168.1.196 ip da expo , porta 3333 é localhost do nodeJS
    baseURL: 'http://192.168.1.196:3333',
})

export default api

