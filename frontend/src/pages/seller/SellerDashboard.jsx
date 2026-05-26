import { useEffect, useState } from "react";
import axios from "axios";
import SellerListingCard from "../../components/seller/SellerListingCard";
import "../../css/ListingCard.css";

function SellerDashboard({ onNavigate }) {
  const [listings, setListings] = useState([]);

  const fetchListings = () => {
    axios
      .get("http://localhost:5000/api/listings")
      .then((response) => setListings(response.data))
      .catch((error) => console.log("Error fetching seller listings:", error));
  };

  useEffect(() => {
    fetchListings();
  }, []);

  const handleDelete = (listingId) => {
    axios
      .delete(`http://localhost:5000/api/listings/${listingId}`)
      .then(() => fetchListings())
      .catch((error) => console.log("Error deleting listing:", error));
  };

  return (
    <div className="products-container">
      <div className="listings-header">
        <h1>Seller Dashboard</h1>

        <button
          className="primary-button"
          type="button"
          onClick={() => onNavigate("/create-listing")}
        >
          Create Listing
        </button>
      </div>

      <div className="products-list">
        {listings.map((listing) => (
          <div key={listing._id}>
            <SellerListingCard 
            listing={listing} 
            onEdit={() => onNavigate(`/edit-listing/${listing._id}`)}
            onDelete={() => handleDelete(listing._id)} 
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default SellerDashboard;