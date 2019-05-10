const express = require('express')
const router = express.Router()
const create_controller = require('../controllers/createController')

router.post('/mp3', create_controller.downloadMp3)

module.exports = router