import axios from 'axios'

const config = require('../config')

// const baseDomain = 'http://localhost:8081'
const baseDomain = config.url

export default() => {
    return axios.create({
        baseURL: `${baseDomain}/api`
    })
}