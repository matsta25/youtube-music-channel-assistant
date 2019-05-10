const express = require('express')
const router = express.Router()
const create_controller = require('../controllers/createController')

const multer  = require('multer')
const uploadBackground = multer({ dest: './res/background/' })
const uploadLogo = multer({ dest: './res/logo/' })

router.post('/mp3', create_controller.downloadMp3)
router.post('/backgroundphoto', uploadBackground.single('image'),  create_controller.saveBackgroundPhoto)
router.post('/logo', uploadLogo.single('logo'),  create_controller.saveLogo)
router.post('/makevideo', create_controller.makeVideo)

module.exports = router