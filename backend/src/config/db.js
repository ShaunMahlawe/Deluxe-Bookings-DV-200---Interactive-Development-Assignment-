const mongoose = require('mongoose')

let databaseConnected = false

async function connectDatabase() {
  const mongoUri = process.env.MONGODB_URI

  if (!mongoUri) {
    console.warn('MONGODB_URI not set. Starting backend in demo fallback mode.')
    return false
  }

  try {
    await mongoose.connect(mongoUri)
    databaseConnected = true
    console.log('MongoDB connection established.')
    return true
  } catch (error) {
    console.error('MongoDB connection failed. Continuing in demo fallback mode.')
    console.error(error.message)
    return false
  }
}

function isDatabaseConnected() {
  return databaseConnected
}

module.exports = {
  connectDatabase,
  isDatabaseConnected,
}