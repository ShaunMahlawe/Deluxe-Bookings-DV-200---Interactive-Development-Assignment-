import API_BASE_URL from "./config";

export const getListings = async () => {
  const response = await fetch(`${API_BASE_URL}/listings`);
  return await response.json();
};

export const getListingById = async (id) => {
  const response = await fetch(`${API_BASE_URL}/listings/${id}`);
  return await response.json();
};