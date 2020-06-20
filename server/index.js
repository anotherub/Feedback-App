const express = require('express')
const app = express()

require('./services/passport')
require('./routes/authRoutes')(app)
app.get('/', (req, res) => {
  res.send({ hi: 'tehre' })
})

const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
  console.log('Server is up and running on port:', PORT)
})
