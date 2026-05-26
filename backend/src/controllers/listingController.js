const Listing = require("../models/listingSchema");

// ------------------------------------------------------------------------------------------------------------------------------
// CREATE(POST) listing
// ------------------------------------------------------------------------------------------------------------------------------

const createListing = async (req, res) => {
  try {
    const newListing = new Listing(req.body);

    const savedListing = await newListing.save();

    res.status(201).json(savedListing);
  } catch (error) {
    res.status(400).json({
      message: "Failed to create listing",
      error: error.message,
    });
  }
};

// ------------------------------------------------------------------------------------------------------------------------------
// READ(GET) all listings
// ------------------------------------------------------------------------------------------------------------------------------

const getAllListings = async (req, res) => {
  try {
    const listings = await Listing.find();

    res.status(200).json(listings);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch listings",
      error: error.message,
    });
  }
};

// ------------------------------------------------------------------------------------------------------------------------------
// READ(GET) single listing by ID
// ------------------------------------------------------------------------------------------------------------------------------

const getSingleListing = async (req, res) => {
  try {
    const listing = await Listing.findById(req.params.id);

    if (!listing) {
      return res.status(404).json({
        message: "Listing not found",
      });
    }

    res.status(200).json(listing);
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
};

// ------------------------------------------------------------------------------------------------------------------------------
// UPDATE(PUT) listing by ID
// ------------------------------------------------------------------------------------------------------------------------------

const updateListing = async (req, res) => {
  try {
    const updatedListing = await Listing.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!updatedListing) {
      return res.status(404).json({
        message: "Listing not found",
      });
    }

    res.status(200).json(updatedListing);
  } catch (err) {
    res.status(400).json({
      error: err.message,
    });
  }
};

// ------------------------------------------------------------------------------------------------------------------------------
// DELETE listing by ID
// ------------------------------------------------------------------------------------------------------------------------------

const deleteListing = async (req, res) => {
  try {
    const deletedListing = await Listing.findByIdAndDelete(req.params.id);

    if (!deletedListing) {
      return res.status(404).json({
        message: "Listing not found",
      });
    }

    res.status(200).json({
      message: "Listing deleted successfully",
    });
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
};

module.exports = {
  createListing,
  getAllListings,
  getSingleListing,
  updateListing,
  deleteListing,
};