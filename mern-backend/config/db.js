//---------------------------------------------------------------------------------------
// This File Handles MongoDB Database Connection Logic for the Deluxe Bookings Backend
//---------------------------------------------------------------------------------------

const mongoose = require('mongoose')
const { MongoMemoryServer } = require('mongodb-memory-server')

let databaseConnected = false
let memoryServer = null

async function connectDatabase() {
  let mongoUri = process.env.MONGODB_URI

  if (!mongoUri) {
    memoryServer = await MongoMemoryServer.create({
      instance: {
        dbName: 'deluxe_bookings',
      },
    })

    mongoUri = memoryServer.getUri()
    console.warn('MONGODB_URI not set. Starting in-memory MongoDB mode.')
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

async function stopDatabase() {
  if (memoryServer) {
    await memoryServer.stop()
    memoryServer = null
  }
}

module.exports = {
  connectDatabase,
  isDatabaseConnected,
  stopDatabase,
}