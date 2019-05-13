const mongoose = require('mongoose')
const Schema = mongoose.Schema

let Video = new Schema({
    description: String
})

module.exports = mongoose.model('Video', Video)