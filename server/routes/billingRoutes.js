const keys = require('../config/keys')
const stripe = require('stripe')(keys.stripeSecretKey)
const requireLogin = require('../middlewares/requireLogin')
module.exports = (app) => {
  app.post('/api/stripe', requireLogin, async (req, res) => {
    await stripe.paymentIntents.create({
      amount: 500,
      currency: 'usd',
      description: 'Software development services'
    })
    req.user.credits += 5
    res.send(await req.user.save())
  })
}
