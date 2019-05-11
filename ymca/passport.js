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
          console.log("accessToken: " + accessToken)
          console.log("refreshToken: " + refreshToken)
          console.log("profile: " + JSON.stringify(profile.photos[0].value))
        User.findOneAndUpdate({ 'id': profile.id },{$set:{'accessToken': accessToken}}, {new: true, useFindAndModify: false}, function (err, user) {
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
            newUser.accessToken = accessToken
            newUser.photoUrl = profile.photos[0].value
            newUser.lastTemplateDescription = null
    
            newUser.save(function (err) {
                if (err) {
                throw err
                }
    
                return done(null, newUser)
            })
            }
        })
      }
    ))
}