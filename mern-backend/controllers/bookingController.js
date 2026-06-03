const Booking = require('../models/bookingSchema')
const { isDatabaseConnected } = require('../config/db')
const { createBooking, listBookingsForUser } = require('../utils/mockStore')

async function getBookings(req, res) {
  if (isDatabaseConnected()) {
    const bookings = await Booking.find({ user: req.user.id }).sort({ createdAt: -1 }).lean()
    return res.json({ bookings })
  }

  return res.json({ bookings: listBookingsForUser(req.user.id) })
}

async function createBookingRequest(req, res) {
  const { destination, suite, checkIn, checkOut, guests, specialRequest } = req.body

  if (!destination || !suite || !checkIn || !checkOut || !guests) {
    return res.status(400).json({ message: 'Complete the full booking form before submitting.' })
  }

  if (isDatabaseConnected()) {
    const booking = await Booking.create({
      user: req.user.id,
      destination,
      suite,
      checkIn,
      checkOut,
      guests,
      specialRequest,
      status: 'confirmed',
    })

    return res.status(201).json({ booking })
  }

  const booking = createBooking({
    user: req.user.id,
    destination,
    suite,
    checkIn,
    checkOut,
    guests,
    specialRequest,
  })

  return res.status(201).json({ booking })
}

module.exports = {
  createBookingRequest,
  getBookings,
}