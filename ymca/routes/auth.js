const express = require('express')
const router = express.Router()
const passport = require('passport')

router.get('/google', passport.authenticate('google', { scope: ['https://www.googleapis.com/auth/youtube.upload','profile'] }))

router.get('/google/callback', passport.authenticate('google', { failureRedirect: '/signin' }), (req, res) => {
        res.redirect('/create')
})


module.exports = router