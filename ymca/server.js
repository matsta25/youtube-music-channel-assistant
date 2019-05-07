require('dotenv').config()

const express = require('express')
const app = express()
const main = require('./routes/main')
const path = require('path')
const auth = require('./routes/auth')
const passport = require('passport') 
const mongoose = require('mongoose')
const session = require('express-session')
const bodyParser = require('body-parser')

require('./passport')(passport)

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use(session({
    secret: 'ymca',
    resave: false,
    saveUninitialized: true
}))

mongoose.connect(process.env.MONGO_URI, {useNewUrlParser: true});

app.use(express.static(path.join(__dirname, './dist')))

app.use(passport.initialize())
app.use(passport.session())

app.use('/', main)
app.use('/auth', auth)

const port = process.env.PORT || 3000
app.listen(port, () => console.log(`Example app listening on port ${port}!`))