const isBlank = (value) => value === undefined || value === null || String(value).trim() === "";

const isValidEmail = (value) => /^\S+@\S+\.\S+$/.test(String(value || ""));

const isValidPhone = (value) => /^[+0-9\s-]{7,20}$/.test(String(value || ""));

const isInRange = (value, min, max) => {
  const numberValue = Number(value);
  return Number.isFinite(numberValue) && numberValue >= min && numberValue <= max;
};

const cleanStringArray = (value) => {
  if (!Array.isArray(value)) {
    return value;
  }

  return value.filter((item) => item && String(item).trim()).map((item) => String(item).trim());
};

const validateListingPayload = (listing) => {
  const errors = [];

  if (isBlank(listing.propertyName) || listing.propertyName.trim().length < 3) {
    errors.push("Property name is required and must be at least 3 characters.");
  }

  if (!isBlank(listing.propertyName) && listing.propertyName.length > 80) {
    errors.push("Property name must be 80 characters or fewer.");
  }

  if (isBlank(listing.propertyType)) {
    errors.push("Property type is required.");
  }

  if (isBlank(listing.description) || listing.description.trim().length < 30) {
    errors.push("Description is required and must be at least 30 characters.");
  }

  if (!isBlank(listing.description) && listing.description.length > 1000) {
    errors.push("Description must be 1000 characters or fewer.");
  }

  if (isBlank(listing.location)) {
    errors.push("Location is required.");
  }

  if (
    isBlank(listing.streetAddress) ||
    isBlank(listing.city) ||
    isBlank(listing.province) ||
    isBlank(listing.country) ||
    isBlank(listing.postalCode)
  ) {
    errors.push("Full address is required. Please include street address, city, province, country, and postal code.");
  }

  if (!isInRange(listing.pricePerNight, 1, 100000)) {
    errors.push("Price per night is required and must be between 1 and 100000.");
  }

  if (!isInRange(listing.bedrooms, 0, 30)) {
    errors.push("Bedrooms are required and must be between 0 and 30.");
  }

  if (!isInRange(listing.bathrooms, 0, 30)) {
    errors.push("Bathrooms are required and must be between 0 and 30.");
  }

  if (!isInRange(listing.guestCapacity, 1, 50)) {
    errors.push("Guest capacity is required and must be between 1 and 50.");
  }

  if (isBlank(listing.hostName)) {
    errors.push("Host name is required.");
  }

  if (!isValidEmail(listing.hostEmail)) {
    errors.push("A valid host email address is required.");
  }

  if (!isValidPhone(listing.hostPhone)) {
    errors.push("A valid host phone number is required.");
  }

  if (listing.images && !Array.isArray(listing.images)) {
    errors.push("Images must be provided as an array.");
  }

  if (Array.isArray(listing.images)) {
    const cleanedImages = cleanStringArray(listing.images);
    const uniqueImages = new Set(cleanedImages);

    if (uniqueImages.size !== cleanedImages.length) {
      errors.push("Duplicate images are not allowed.");
    }
  }

  return errors;
};

module.exports = {
  cleanStringArray,
  validateListingPayload,
};
