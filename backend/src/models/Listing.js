const mongoose = require("mongoose");

const ListingSchema = new mongoose.Schema(
  {
    seller: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    
    // Public name shown on listings
    propertyName: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 80,
    },

    // Constrained property type
    propertyType: {
      type: String,
      required: true,
      enum: [
        "Apartment",
        "Villa",
        "House",
        "Cabin",
        "Hotel room",
        "Guesthouse",
        "Beach house",
        "Farm stay",
      ],
    },

    description: {
      type: String,
      required: true,
      minlength: 30,
      maxlength: 1000,
    },

    // Human readable location string (assembled from address parts)
    location: {
      type: String,
      required: true,
    },

    // Address parts - stored separately for future features
    streetAddress: { type: String },
    suburb: { type: String },
    city: { type: String },
    province: { type: String },
    country: { type: String },
    postalCode: { type: String },

    distanceFromCentre: {
      type: String,
    },

    // Featured image URL (first image)
    image: {
      type: String,
      default: "",
    },

    images: {
      type: [String],
      default: [],
    },

    pricePerNight: {
      type: Number,
      required: true,
      min: 1,
      max: 100000,
    },

    oldPrice: {
      type: Number,
      min: 0,
    },

    nights: {
      type: Number,
      min: 0,
    },

    bedrooms: {
      type: Number,
      required: true,
      min: 0,
      max: 30,
    },

    bathrooms: {
      type: Number,
      required: true,
      min: 0,
      max: 30,
    },

    beds: {
      type: String,
    },

    area:{
      type:Number
    },

    checkInTime:{
      type:String
    },

    checkOutTime:{
      type:String
    },

    additionalRules:{
      type:String
    },

    services:{
      type:[String],
      default:[]
    },

    facilities:{
      type:[String],
      default:[]
    },

    beachDistance: {
      type: String,
    },

    tags: {
      type: [String],
      default: [],
    },

    cancellation: {
      type: String,
    },

    taxesAndCharges: {
      type: Number,
      min: 0,
    },

    isFullyBooked: {
      type: Boolean,
      default: false,
    },

    status: {
      type: String,
      default: "published",
    },

    hostName: {
      type: String,
      required: true,
    },

    hostEmail: {
      type: String,
      required: true,
      match: [/^\S+@\S+\.\S+$/, "Please provide a valid email address"],
    },

    hostPhone: {
      type: String,
      required: true,
      // Basic phone validation: allows digits, spaces and leading +
      match: [/^[+0-9\s-]{7,20}$/, "Please provide a valid phone number"],
    },

    guestCapacity: {
      type: Number,
      required: true,
      min: 1,
      max: 50,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Listing", ListingSchema);