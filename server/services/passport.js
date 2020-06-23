const passport = require('passport')
const mongoose = require('mongoose')
const GoogleStrategy = require('passport-google-oauth20').Strategy
const keys = require('../config/keys')
const User = mongoose.model('users')

passport.serializeUser((user, done) => {
  done(null, user.id)
})
passport.deserializeUser((id, done) => {
  User.findById(id).then((doc) => {
    done(null, doc)
  })
})

passport.use(
  new GoogleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: '/auth/google/callback',
      proxy: true
    },
    async (accessToken, refreshToken, profile, done) => {
      const doc = await User.findOne({ googleID: profile.id })

      if (doc) {
        console.log('account already exists')
        done(null, doc)
      } else {
        const doc = await new User({ googleID: profile.id }).save()
        done(null, doc)
      }
    }
  )
)
