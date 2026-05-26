import API_BASE_URL from "./config";

export const createSellerListing = async (listingData, token) => {
  const response = await fetch(`${API_BASE_URL}/seller/listings`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(listingData),
  });

  return response.json();
};

export const getMySellerListings = async (token) => {
  const response = await fetch(`${API_BASE_URL}/seller/listings`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.json();
};

export const updateMySellerListing = async (id, listingData, token) => {
  const response = await fetch(`${API_BASE_URL}/seller/listings/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(listingData),
  });

  return response.json();
};

export const deleteMySellerListing = async (id, token) => {
  const response = await fetch(`${API_BASE_URL}/seller/listings/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.json();
};

export const getSellerBookings = async (token) => {
  const response = await fetch(`${API_BASE_URL}/seller/bookings`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.json();
};