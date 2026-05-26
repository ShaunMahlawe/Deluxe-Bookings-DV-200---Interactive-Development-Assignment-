const express = require('express')

const { createBookingRequest, getBookings } = require('../controllers/bookingController')
const { protect } = require('../middleware/authMiddleware')

const router = express.Router()

router.get('/', protect, getBookings)
router.post('/', protect, createBookingRequest)

module.exports = router