const API_URL = "http://localhost:5000/api/listings";

export const getListings = async () => {
  const response = await fetch(API_URL);
  return await response.json();
};

export const getListingById = async (id) => {
  const response = await fetch(`${API_URL}/${id}`);
  return await response.json();
};