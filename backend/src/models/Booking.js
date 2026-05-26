const mongoose = require('mongoose')

const bookingSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    destination: {
      type: String,
      required: true,
      trim: true,
    },
    suite: {
      type: String,
      required: true,
      trim: true,
    },
    checkIn: {
      type: String,
      required: true,
    },
    checkOut: {
      type: String,
      required: true,
    },
    guests: {
      type: Number,
      required: true,
      min: 1,
    },
    specialRequest: {
      type: String,
      default: '',
      trim: true,
    },
    status: {
      type: String,
      default: 'confirmed',
      trim: true,
    },
  },
  {
    timestamps: true,
  },
)

module.exports = mongoose.model('Booking', bookingSchema)