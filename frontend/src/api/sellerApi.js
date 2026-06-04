import API_BASE_URL from "./config";

const parseResponse = async (response) => {
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || data.error || "Seller request failed.");
  }

  return data;
};

export const createSellerListing = async (listingData, token) => {
  const response = await fetch(`${API_BASE_URL}/sellers/listings`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(listingData),
  });

  return parseResponse(response);
};

export const getMySellerListings = async (token) => {
  const response = await fetch(`${API_BASE_URL}/sellers/listings`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return parseResponse(response);
};

export const getMySellerListing = async (id, token) => {
  const response = await fetch(`${API_BASE_URL}/sellers/listings/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return parseResponse(response);
};

export const updateMySellerListing = async (id, listingData, token) => {
  const response = await fetch(`${API_BASE_URL}/sellers/listings/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(listingData),
  });

  return parseResponse(response);
};

export const removeMySellerListing = async (id, token) => {
  const response = await fetch(`${API_BASE_URL}/sellers/listings/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return parseResponse(response);
};

// export const getSellerBookings = async (token) => {
//   const response = await fetch(`${API_BASE_URL}/sellers/bookings`, {
//     headers: {
//       Authorization: `Bearer ${token}`,
//     },
//   });

//   return parseResponse(response);
// };
