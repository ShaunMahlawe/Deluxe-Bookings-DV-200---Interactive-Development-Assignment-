export const LISTING_DRAFT_KEY = "deluxe_listing_intake_draft";
// export const LOCAL_SELLER_LISTINGS_KEY = "deluxe_local_seller_listings";

export const readStoredJson = (key, fallback) => {
  try {
    const storedValue = localStorage.getItem(key);
    return storedValue ? JSON.parse(storedValue) : fallback;
  } catch (error) {
    console.warn(`Could not read ${key} from local storage:`, error);
    return fallback;
  }
};

export const writeStoredJson = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
};

export const removeStoredValue = (key) => {
  localStorage.removeItem(key);
};

export const getListingDraft = () => readStoredJson(LISTING_DRAFT_KEY, null);

export const saveListingDraft = (draft) => {
  writeStoredJson(LISTING_DRAFT_KEY, draft);
};

export const clearListingDraft = () => {
  removeStoredValue(LISTING_DRAFT_KEY);
};




// export const getLocalSellerListings = () =>
//   readStoredJson(LOCAL_SELLER_LISTINGS_KEY, []);

// export const saveLocalSellerListings = (listings) => {
//   writeStoredJson(LOCAL_SELLER_LISTINGS_KEY, listings);
// };

// export const createLocalSellerListing = (listingData) => {
//   const listings = getLocalSellerListings();
//   const listing = {
//     ...listingData,
//     _id: `local-${Date.now()}`,
//     status: "In review",
//     createdAt: new Date().toISOString(),
//   };

//   saveLocalSellerListings([listing, ...listings]);
//   return listing;
// };

// export const updateLocalSellerListing = (listingId, listingData) => {
//   const listings = getLocalSellerListings();
//   const nextListings = listings.map((listing) =>
//     listing._id === listingId ? { ...listing, ...listingData, updatedAt: new Date().toISOString() } : listing
//   );

//   saveLocalSellerListings(nextListings);
//   return nextListings.find((listing) => listing._id === listingId);
// };

// export const deleteLocalSellerListing = (listingId) => {
//   saveLocalSellerListings(getLocalSellerListings().filter((listing) => listing._id !== listingId));
// };
