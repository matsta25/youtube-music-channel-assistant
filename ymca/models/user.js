const mongoose = require('mongoose')
const Schema = mongoose.Schema

let User = new Schema({
    id: String,
    displayName: String,
    username: String,
    accessToken: String,
    photoUrl: String,
    lastTemplate: String
})

module.exports = mongoose.model('User', User)