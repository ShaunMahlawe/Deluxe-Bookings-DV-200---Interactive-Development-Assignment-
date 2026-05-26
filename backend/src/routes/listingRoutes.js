const express = require("express");
const router = express.Router();

const {
  createListing,
  getAllListings,
  getSingleListing,
  updateListing,
  deleteListing,
} = require("../controllers/listingController");


// CREATE listing
router.post("/", createListing);

// READ all listings
router.get("/", getAllListings);

// READ single listing by ID
router.get("/:id", getSingleListing);

// UPDATE listing by ID
router.put("/:id", updateListing);

// DELETE listing by ID
router.delete("/:id", deleteListing);

module.exports = router;