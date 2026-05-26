require('dotenv').config()

const app = require('./app')
const { connectDatabase } = require('./config/db')

const port = process.env.PORT || 5001

async function startServer() {
  await connectDatabase()

  app.listen(port, () => {
    console.log(`Backend listening on http://localhost:${port}`)
  })
}

startServer()