const GoogleStrategy = require('passport-google-oauth20').Strategy
const User = require('./models/user')
        
module.exports = (passport) => {
    passport.serializeUser(function(user, done) {
        done(null, user)
    })

    passport.deserializeUser(function(user, done) {
        done(null, user)
    })

    passport.use(new GoogleStrategy({
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: process.env.GOOGLE_CALLBACKURL
      },
      function(accessToken, refreshToken, profile, done) {
        User.findOne({ 'id': profile.id }, function (err, user) {
            if (err) {
            return done(err)
            }
    
            if (user) {
            return done(null, user)
            } else {
            var newUser = new User()
    
            newUser.id = profile.id
            newUser.username = profile.username
            newUser.displayName = profile.displayName
    
            newUser.save(function (err) {
                if (err) {
                throw err
                }
    
                return done(null, profile)
            })
            }
        })
      }
    ))
}