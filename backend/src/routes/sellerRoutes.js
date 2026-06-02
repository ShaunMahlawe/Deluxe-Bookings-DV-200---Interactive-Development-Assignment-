const express = require("express");

const { protect } = require('../middleware/authMiddleware')
// const { validateListing } = require("../middleware/validateListing");

const {
  createMyListing,
  getMyListings,
  getMyListing,
  updateMyListing,
  deleteMyListing,
  // getSellerBookings, → Move to BookingRoutes.
} = require("../controllers/sellerController");

const router = express.Router();

router.post(
  "/listings",
  protect,
  // validateListing,
  createMyListing
);

router.get(
  "/listings",
  protect,
  getMyListings
);

router.get(
  "/listings/:id",
  protect,
  getMyListing
);

router.put(
  "/listings/:id",
  protect,
  // validateListing,
  updateMyListing
);

router.delete(
  "/listings/:id",
  protect,
  deleteMyListing
);

// router.get(
//   "/bookings",
//   protect,
//   getSellerBookings
// );

module.exports = router;
