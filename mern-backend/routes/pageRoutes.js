const express = require("express");
const router = express.Router();

const verifyToken = require("../middleware/verifyToken");
const listingController = require("../controllers/listingController");
const sellerController = require("../controllers/sellerController");
const adminController = require("../controllers/adminController");

/* Restricts access to Sellers ('S') and Admins ('A'). */
const requireSeller = (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({ message: "Authentication required." });
  }

  if (req.user.userRole === "S" || req.user.userRole === "A") {
    return next();
  }

  return res
    .status(403)
    .json({ message: "Access denied. Seller or Admin privileges required." });
};

/* Restricts access strictly to Admins ('A').*/
const requireAdmin = (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({ message: "Authentication required." });
  }

  if (req.user.userRole === "A") {
    return next();
  }

  return res
    .status(403)
    .json({ message: "Access denied. Admin privileges required." });
};

// Listings - Public endpoints
router.get("/listings", listingController.getAllListings);
router.get("/listings/:id", listingController.getSingleListing);

/* The protected endpoints */

// Seller endpoints
router.post(
  "/listings",
  verifyToken,
  requireSeller,
  sellerController.createMyListing,
);
router.put(
  "/listings/:id",
  verifyToken,
  requireSeller,
  sellerController.updateMyListing,
);
router.delete(
  "/listings/:id",
  verifyToken,
  requireSeller,
  sellerController.deleteMyListing,
);

// Admin endpoints
router.get(
  "/admin/users",
  verifyToken,
  requireAdmin,
  adminController.getAllUsers,
);

router.delete(
  "/admin/users/:id",
  verifyToken,
  requireAdmin,
  adminController.deleteUser,
);

router.get(
  "/admin/listings",
  verifyToken,
  requireAdmin,
  adminController.getAllListings,
);

router.patch(
  "/admin/listings/:id/approve",
  verifyToken,
  requireAdmin,
  adminController.approveListing,
);

router.patch(
  "/admin/listings/:id/unapprove",
  verifyToken,
  requireAdmin,
  adminController.unapproveListing,
);

router.get(
  "/admin/bookings",
  verifyToken,
  requireAdmin,
  adminController.getAllBookings,
);

module.exports = router;
