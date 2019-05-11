const express = require('express')
const router = express.Router()
const passport = require('passport')

router.get('/google', passport.authenticate('google', { scope: ['https://www.googleapis.com/auth/youtube.upload','profile'] }))

router.get('/google/callback', passport.authenticate('google', { failureRedirect: '/' }), (req, res) => {
        res.redirect('/')
})

module.exports = router