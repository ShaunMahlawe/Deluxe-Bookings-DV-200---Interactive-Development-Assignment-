require("dotenv").config();
const app = require('./app')
const { connectDatabase, stopDatabase } = require('./config/db')

const PORT = process.env.PORT || 5000

const startServer = async () => {
  try {
    await connectDatabase()  // DB connection FIRST
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`)
    })
  } catch (error) {
    console.error('Failed to start server:', error)
    process.exit(1)
  }
}

const shutdown = async (signal) => {
  console.log(`${signal} received. Shutting down gracefully...`)
  try {
    await stopDatabase()
  } finally {
    process.exit(0)
  }
}

process.on('SIGINT', shutdown)
process.on('SIGTERM', shutdown)

startServer()
