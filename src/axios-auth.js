import axios from 'axios'

const instance = axios.create({
    // Deployment URL
    ///baseURL: ''

    // Production URL
    baseURL: 'http://localhost:8080/'
})

export default instance