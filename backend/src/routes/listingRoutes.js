const express = require("express");

const {
  getAllListings,
  getSingleListing,
} = require("../controllers/listingController");

const router = express.Router();

// READ all listings
router.get("/", getAllListings);

// READ single listing by ID
router.get("/:id", getSingleListing);

module.exports = router;
