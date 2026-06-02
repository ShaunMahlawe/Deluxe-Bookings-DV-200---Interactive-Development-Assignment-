const {
  cleanStringArray,
  validateListingPayload,
} = require("../utils/validators");

const validateListing = (req, res, next) => {
  const errors = validateListingPayload(req.body);

  if (errors.length > 0) {
    return res.status(400).json({
      message: errors[0],
      errors,
    });
  }

  if (Array.isArray(req.body.images)) {
    const cleanedImages = cleanStringArray(req.body.images);
    req.body.images = cleanedImages;
    req.body.image = cleanedImages[0] || req.body.image || "";
  }

  next();
};

module.exports = { validateListing };
