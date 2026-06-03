const Listing = require("../models/listingSchema");

// ------------------------------------------------------------------------------------------------------------------------------
// READ(GET) all listings
// ------------------------------------------------------------------------------------------------------------------------------

const getAllListings = async (req, res) => {
  try {
    const listings = await Listing.find({ status: "published" });

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
    const listing = await Listing.findOne({ _id: req.params.id, status: "published" });

    if (!listing) {
      return res.status(404).json({
        message: "Listing not found",
      });
    }

    res.status(200).json(listing);
  } catch (err) {
    res.status(500).json({
      message: "Failed to fetch listing",
      error: err.message,
    });
  }
};

module.exports = {
  getAllListings,
  getSingleListing,
};
