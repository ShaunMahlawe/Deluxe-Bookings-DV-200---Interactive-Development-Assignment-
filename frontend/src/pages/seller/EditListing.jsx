import { useEffect, useState } from "react";
import { Alert, Container, Spinner } from "react-bootstrap";
import { getMySellerListing, updateMySellerListing } from "../../api/sellerApi";

import ListingForm, {
  initialListingForm,
} from "../../components/seller/ListingForm";
// import {
//   getLocalSellerListings,
//   updateLocalSellerListing,
// } from "../../utils/listingStorage";

import "../../css/seller/Listing.css";

const getImageSource = (image) => {
  if (!image) return "";
  if (typeof image === "string") return image;
  return image.preview || image.url || "";
};

const buildListingPayload = (formData) => {
  const images = Array.isArray(formData.images)
    ? formData.images.map(getImageSource).filter(Boolean)
    : [];

  return {
    ...formData,
    images,
    image: images[0] || getImageSource(formData.image),
    bedrooms: formData.bedrooms ? Number(formData.bedrooms) : "",
    bathrooms: formData.bathrooms ? Number(formData.bathrooms) : "",
    guestCapacity: formData.guestCapacity ? Number(formData.guestCapacity) : "",
    pricePerNight: formData.pricePerNight ? Number(formData.pricePerNight) : "",
    isFullyBooked: Boolean(formData.isFullyBooked),
  };
};

function EditListing({ listingId, onNavigate }) {
  const [formData, setFormData] = useState(initialListingForm);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");

    // if (listingId?.startsWith("local-")) {
    //   const listing = getLocalSellerListings().find(
    //     (item) => item._id === listingId,
    //   );
    //   setFormData({ ...initialListingForm, ...(listing || {}) });
    //   setLoading(false);
    //   return;
    // }

    if (!token) {
      setErrorMessage("You need to be logged in to edit this listing.");
      setLoading(false);
      return;
    }

    getMySellerListing(listingId, token)
      .then((listing) => {
        setFormData({
          ...initialListingForm,
          ...listing,
          guests: listing.guestCapacity ?? listing.guests ?? "",
        });
        setLoading(false);
      })
      .catch((error) => {
        console.log("Error fetching listing:", error);
        setErrorMessage("Could not load this listing.");
        setLoading(false);
      });
  }, [listingId]);

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // const handleUpdate = () => {
  //   if (listingId?.startsWith("local-")) {
  //     updateLocalSellerListing(listingId, formData);
  //     onNavigate("/seller/dashboard");
  //     return;
  //   }

  //   const token = localStorage.getItem("deluxe_token");

  //   if (!token) {
  //     return;
  //   }

  const handleUpdate = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      setErrorMessage("You need to be logged in to update this listing.");

      return;
    }

    try {
      await updateMySellerListing(listingId, buildListingPayload(formData), token);

      onNavigate("/seller/dashboard");
    } catch (error) {
      console.log("Error updating listing:", error);

      setErrorMessage("Could not update this listing.");
    }
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
    <main className="create-listing-page">
      <Container fluid="lg">
        {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}

        <ListingForm
          formData={formData}
          onChange={handleChange}
          onSubmit={handleUpdate}
          submitLabel="Update Listing"
        />
      </Container>
    </main>
  );
}

export default EditListing;
