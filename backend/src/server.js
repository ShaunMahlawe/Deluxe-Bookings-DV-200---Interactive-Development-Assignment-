require('dotenv').config()

const app = require('./app')
const { connectDatabase, stopDatabase } = require('./config/db')

const port = process.env.PORT || 5001

async function startServer() {
  await connectDatabase()

  app.listen(port, () => {
    console.log(`Backend listening on http://localhost:${port}`)
  })
}

startServer()

async function shutdown(signal) {
  try {
    await stopDatabase()
  } finally {
    process.exit(0)
  }
}

process.on('SIGINT', shutdown)
process.on('SIGTERM', shutdown)