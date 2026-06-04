const express = require("express");

const { protect, requireAdmin } = require("../middleware/authMiddleware");
const adminController = require("../controllers/adminController");

const router = express.Router();

router.get("/users", protect, requireAdmin, adminController.getAllUsers);
router.delete("/users/:id", protect, requireAdmin, adminController.deleteUser);
router.get("/listings", protect, requireAdmin, adminController.getAllListings);
router.patch(
  "/listings/:id/approve",
  protect,
  requireAdmin,
  adminController.approveListing,
);
router.patch(
  "/listings/:id/unapprove",
  protect,
  requireAdmin,
  adminController.unapproveListing,
);
router.get("/bookings", protect, requireAdmin, adminController.getAllBookings);

module.exports = router;
