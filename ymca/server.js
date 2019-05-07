require('dotenv').config()

const express = require('express')
const app = express()
const main = require('./routes/main')
const path = require('path')
const auth = require('./routes/auth')
const passport = require('passport')
const mongoose = require('mongoose')

mongoose.connect(process.env.MONGO_URI, {useNewUrlParser: true});


app.use(express.static(path.join(__dirname, './dist')))

require('./passport')(passport)
app.use(passport.initialize())
app.use(passport.session())

app.use('/', main)
app.use('/auth', auth)

const port = process.env.PORT || 3000
app.listen(port, () => console.log(`Example app listening on port ${port}!`))