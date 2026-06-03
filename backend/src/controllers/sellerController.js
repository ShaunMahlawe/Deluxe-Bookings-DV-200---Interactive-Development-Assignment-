const Listing = require("../models/listingSchema");

// ------------------------------------------------------------------------------------------------------------------------------
// CREATE(POST) listing
// ------------------------------------------------------------------------------------------------------------------------------

const createMyListing = async (req, res) => {
  try {
    const newListing = new Listing({
      ...req.body,
      seller: req.user.id,
    });

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

const getMyListings = async (req, res) => {
  try {
    const listings = await Listing.find({ seller: req.user.id });

    res.status(200).json(listings);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch listings",
      error: error.message,
    });
  }
};

// ------------------------------------------------------------------------------------------------------------------------------
// READ(GET) single seller listing by ID
// ------------------------------------------------------------------------------------------------------------------------------

const getMyListing = async (req, res) => {
  try {
    const listing = await Listing.findOne({
      _id: req.params.id,
      seller: req.user.id,
    });

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

const updateMyListing = async (req, res) => {
  try {
    const updatedListing = await Listing.findOneAndUpdate(
      {
        _id: req.params.id,
        seller: req.user.id,
      },
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

const deleteMyListing = async (req, res) => {
  try {
    const updatedListing = await Listing.findOneAndUpdate(
      {
        _id: req.params.id,
        seller: req.user.id,
      },
      {
        status: "removed_from_public",
        removedFromPublicAt: new Date(),
      },
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

    res.status(200).json({
      message: "Listing removed from public view.",
      listing: updatedListing,
    });
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
};

module.exports = {
  createMyListing,
  getMyListings,
  getMyListing,
  updateMyListing,
  deleteMyListing,
};
