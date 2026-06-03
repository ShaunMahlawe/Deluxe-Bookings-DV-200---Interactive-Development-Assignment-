const User = require("../models/userSchema");
const Listing = require("../models/listingSchema");
const Booking = require("../models/bookingSchema");

// Admin views all users
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password");

    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch users",
      error: error.message,
    });
  }
};

// Admin deletes a user
const deleteUser = async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);

    if (!deletedUser) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    res.status(200).json({
      message: "User deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to delete user",
      error: error.message,
    });
  }
};

// Admin views all listings
const getAllListings = async (req, res) => {
  try {
    const listings = await Listing.find().populate(
      "seller",
      "name email userRole"
    );

    res.status(200).json(listings);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch listings",
      error: error.message,
    });
  }
};

// Admin approves listing
const approveListing = async (req, res) => {
  try {
    const listing = await Listing.findByIdAndUpdate(
      req.params.id,
      { isApproved: true },
      { new: true }
    );

    if (!listing) {
      return res.status(404).json({
        message: "Listing not found",
      });
    }

    res.status(200).json({
      message: "Listing approved successfully",
      listing,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to approve listing",
      error: error.message,
    });
  }
};

// Admin removes listing approval
const unapproveListing = async (req, res) => {
  try {
    const listing = await Listing.findByIdAndUpdate(
      req.params.id,
      { isApproved: false },
      { new: true }
    );

    if (!listing) {
      return res.status(404).json({
        message: "Listing not found",
      });
    }

    res.status(200).json({
      message: "Listing approval removed",
      listing,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to unapprove listing",
      error: error.message,
    });
  }
};

// Admin views all bookings
const getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find()
      .populate("buyer", "name email")
      .populate("listing", "propertyName location pricePerNight");

    res.status(200).json(bookings);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch bookings",
      error: error.message,
    });
  }
};

module.exports = {
  getAllUsers,
  deleteUser,
  getAllListings,
  approveListing,
  unapproveListing,
  getAllBookings,
};
