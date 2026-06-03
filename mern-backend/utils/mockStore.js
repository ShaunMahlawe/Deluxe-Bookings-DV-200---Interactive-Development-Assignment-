const bcrypt = require('bcryptjs')

let userCounter = 2
let bookingCounter = 3

const users = [
  {
    id: '1',
    name: 'Demo Guest',
    email: 'demo@deluxebookings.com',
    passwordHash: bcrypt.hashSync('Password123!', 10),
    signatureWordHash: bcrypt.hashSync('Aurora', 10),
  },
]

const bookings = [
  {
    id: '1',
    user: '1',
    destination: 'Cape Town',
    suite: 'Ocean Suite',
    checkIn: '2026-06-18',
    checkOut: '2026-06-22',
    guests: 2,
    specialRequest: 'Champagne on arrival',
    status: 'confirmed',
  },
  {
    id: '2',
    user: '1',
    destination: 'Franschhoek',
    suite: 'Vineyard Loft',
    checkIn: '2026-07-03',
    checkOut: '2026-07-06',
    guests: 2,
    specialRequest: 'Private tasting reservation',
    status: 'pending',
  },
]

function safeUser(user) {
  return {
    id: user.id,
    name: user.name,
    email: user.email,
  }
}

function findUserByEmail(email) {
  return users.find((user) => user.email === email.toLowerCase())
}

function findUserById(id) {
  return users.find((user) => user.id === String(id))
}

function createUser({ name, email, passwordHash, signatureWordHash }) {
  const user = {
    id: String(userCounter),
    name,
    email: email.toLowerCase(),
    passwordHash,
    signatureWordHash,
  }

  userCounter += 1
  users.push(user)
  return user
}

function listBookingsForUser(userId) {
  return bookings.filter((booking) => booking.user === String(userId)).reverse()
}

function createBooking(data) {
  const booking = {
    id: String(bookingCounter),
    status: 'confirmed',
    ...data,
  }

  bookingCounter += 1
  bookings.push(booking)
  return booking
}

module.exports = {
  createBooking,
  createUser,
  findUserByEmail,
  findUserById,
  listBookingsForUser,
  safeUser,
}