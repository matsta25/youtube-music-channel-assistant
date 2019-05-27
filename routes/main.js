const express = require('express')
const router = express.Router()
const path = require('path')

router.get('/isauth', (req, res) => {
    res.send(req.user)
})

router.get('/logout', (req, res) => {
    req.logout()
    res.redirect('/')
})

router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname,'../dist/index.html'))
})

router.get('*', (req, res) => {
    res.statusCode(404);
})


module.exports = router