const express = require('express')
const mongoose = require('mongoose')
const keys = require('./config/keys')
const cookieSession = require('cookie-session')
const passport = require('passport')

require('./models/User')
require('./services/passport')

mongoose.connect(keys.mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
mongoose.connection.once('open', () => {
  console.log('MongoDB database connection established successfully')
})
const app = express()
app.use(cookieSession({ maxAge: 30 * 24 * 60 * 60 * 1000, keys: [keys.cookieKey] }))
app.use(passport.initialize())
app.use(passport.session())

app.get('/', (req, res) => {
  res.send({ hi: 'there' })
})

require('./routes/authRoutes')(app)

const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
  console.log('Server is up and running on port:', PORT)
})

// mongodb+srv://umeshbhat:umeshbhat@cluster0-24fhy.mongodb.net/feedbackapp-prod?retryWrites=true&w=majority

//970763464240-4us97nd4juna9unk5fcei81oviutd1uj.apps.googleusercontent.com

//H35wSw2o1MmkoRwrSaJnlZIs
