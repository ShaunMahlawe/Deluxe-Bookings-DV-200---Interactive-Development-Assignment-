import { useEffect, useState } from "react";
import { Container, Spinner } from "react-bootstrap";
import { getMySellerListing, updateMySellerListing } from "../../api/sellerApi";

import ListingForm, { initialListingForm } from "../../components/seller/ListingForm";
import {
  getLocalSellerListings,
  updateLocalSellerListing,
} from "../../utils/listingStorage";
import "../../css/Listing.css";

function EditListing({ listingId, onNavigate }) {
  const [formData, setFormData] = useState(initialListingForm);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("deluxe_token");

    if (listingId?.startsWith("local-")) {
      const listing = getLocalSellerListings().find((item) => item._id === listingId);
      setFormData({ ...initialListingForm, ...(listing || {}) });
      setLoading(false);
      return;
    }

    if (!token) {
      setLoading(false);
      return;
    }

    getMySellerListing(listingId, token)
      .then((data) => {
        setFormData(data);
        setLoading(false);
      })
      .catch((error) => {
        console.log("Error fetching listing:", error);
        setLoading(false);
      });
  }, [listingId]);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleUpdate = () => {
    if (listingId?.startsWith("local-")) {
      updateLocalSellerListing(listingId, formData);
      onNavigate("/seller/dashboard");
      return;
    }

    const token = localStorage.getItem("deluxe_token");

    if (!token) {
      return;
    }

    updateMySellerListing(listingId, formData, token)
      .then(() => {
        onNavigate("/seller/dashboard");
      })
      .catch((error) => {
        console.log("Error updating listing:", error);
      });
  };

  if (loading) {
    return (
      <main className="create-listing-page">
        <Container fluid="lg" className="seller-loading">
          <Spinner animation="border" role="status" />
          <span>Loading listing...</span>
        </Container>
      </main>
    );
  }

  return (
    <ListingForm
      formData={formData}
      onChange={handleChange}
      onSubmit={handleUpdate}
      submitLabel="Update Listing"
    />
  );
}

export default EditListing;
