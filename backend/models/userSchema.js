const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    // SOFT REMOVE: previous auth code used `password`; authController stores
    // hashes instead, so keep the old shape visible while moving to hashes.
    // password: {
    //   type: String,
    //   required: true,
    // },
    passwordHash: {
      type: String,
      required: true,
    },
    signatureWordHash: {
      type: String,
      required: false,
    },
    userRole: {
      type: String,
      required: true,
      enum: ["B", "S", "A"],
      default: "B",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", UserSchema);
