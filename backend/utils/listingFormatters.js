export const createLocationString = (data) => {
  return `${data.streetAddress}, ${data.suburb || ""}, ${data.city}, ${data.province}, ${data.country}, ${data.postalCode}`
    .replace(/,\s+,/g, ", ")
    .replace(/^(, )+|(, )+$/g, "")
    .trim();
};

export const formatListingPayload = (formData) => {
  return {
    propertyName: formData.propertyName,
    propertyType: formData.propertyType,
    description: formData.description,

    streetAddress: formData.streetAddress,
    suburb: formData.suburb,
    city: formData.city,
    province: formData.province,
    country: formData.country,
    postalCode: formData.postalCode,
    location: createLocationString(formData),

    bedrooms: Number(formData.bedrooms),
    bathrooms: Number(formData.bathrooms),
    guestCapacity: Number(formData.guests),
    beds: formData.beds,
    area: formData.area,

    pricePerNight: Number(formData.pricePerNight),

    images: formData.images,

    hostName: formData.hostName,
    hostEmail: formData.hostEmail,
    hostPhone: formData.hostPhone,

    checkInTime: formData.checkInTime,
    checkOutTime: formData.checkOutTime,
    additionalRules: formData.additionalRules,

    services: formData.services,
    facilities: formData.facilities,
    tags: formData.tags,

    isFullyBooked: Boolean(formData.isFullyBooked),
    status: formData.status || "submitted_for_review",
  };
};