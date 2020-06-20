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
      callbackURL: '/auth/google/callback'
    },
    (accessToken, refreshToken, profile, done) => {
      User.findOne({ googleID: profile.id })
        .then((doc) => {
          if (doc) {
            console.log('account already exists')
            done(null, doc)
          } else {
            new User({ googleID: profile.id }).save().then((doc) => {
              done(null, doc)
            })
          }
        })
        .catch((err) => {
          console.log('Error in finding googleID', err)
        })
    }
  )
)
