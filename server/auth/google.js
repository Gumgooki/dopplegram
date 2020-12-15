const passport = require('passport')
const {User} = require('../db/models/')
const router = require('express').Router()
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy

const googleConfig = {
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: process.env.GOOOGLE_CALLBACK
}



// configure the strategy with our config object, and write the function that passport will invoke after google sends us the user's profile and access token
const strategy = new GoogleStrategy(googleConfig, function(token, refreshToken, profile, done){
  const googleId = profile.id
  const name = profile.displayName
  const email = profile.emails[0].value

  User.findOne({where: { googleId: googleId  }})
  .then(function (user) {
    if (!user) {
      return User.create({ name, email, googleId })
        .then(function (user) {
          done(null, user);
        });
    } else {
      done(null, user);
    }
  })
  .catch(done);
})

passport.use(strategy)

//once we make an auth folder we should correct this
router.get('/', passport.authenticate('google', { scope: 'email' }))

//same with this
router.get('/callback', passport.authenticate('google', {
  prompt: 'select_account',
  successRedirect: '/home',
  failureRedirect: '/login'
}))

module.exports = router
