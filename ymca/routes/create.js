const express = require('express')
const router = express.Router()
const create_controller = require('../controllers/createController')

const multer  = require('multer')
const upload = multer({ dest: 'res/background/' })

router.post('/mp3', create_controller.downloadMp3)
router.post('/backgroundphoto', upload.single('image'),  create_controller.saveBackgroundPhoto)

module.exports = router