const express = require("express");

const { protect, requireSeller } = require("../middleware/authMiddleware");
const { validateListing } = require("../middleware/validateListing");

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
  requireSeller,
  validateListing,
  createMyListing
);

router.get(
  "/listings",
  protect,
  requireSeller,
  getMyListings
);

router.get(
  "/listings/:id",
  protect,
  requireSeller,
  getMyListing
);

router.put(
  "/listings/:id",
  protect,
  requireSeller,
  validateListing,
  updateMyListing
);

router.delete(
  "/listings/:id",
  protect,
  requireSeller,
  deleteMyListing
);

// router.get(
//   "/bookings",
//   protect,
//   getSellerBookings
// );

module.exports = router;
