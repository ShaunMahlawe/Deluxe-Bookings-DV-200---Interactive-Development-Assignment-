const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema(
  {
    buyer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    listing: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Listing",
      required: true,
    },

    ratingText: {
      type: String,
    },

    ratingScore: {
      type: Number,
      min: 0,
      max: 10,
    },

    reviewCount: {
      type: Number,
      min: 0,
    },

    valueScore: {
      type: Number,
    },

    comment: {
      type: String,
      trim: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Review", reviewSchema);