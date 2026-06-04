const express = require("express");
const router = express.Router();

const listingRoutes = require("./listingRoutes");
const sellerRoutes = require("./sellerRoutes");
const adminRoutes = require("./adminRoutes");

// Canonical route modules:
// - /api/listings for public read-only listing endpoints.
// - /api/sellers for protected seller listing CRUD.
// - /api/admin for protected admin workflows.
//
// /api/pages remains as a temporary compatibility index while duplicate route
// definitions are retired.
router.use("/listings", listingRoutes);
router.use("/sellers", sellerRoutes);
router.use("/admin", adminRoutes);

// SOFT REMOVE: the previous inline CRUD/admin handlers were intentionally
// replaced by the canonical routers above. Keeping this note instead of hard
// deleting the route history per audit instructions.

module.exports = router;
