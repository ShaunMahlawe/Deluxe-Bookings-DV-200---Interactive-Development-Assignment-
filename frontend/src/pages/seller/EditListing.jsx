import { useEffect, useState } from "react";
import axios from "axios";

import ListingForm from "../../components/seller/ListingForm";

function EditListing({ listingId, onNavigate }) {
  const [formData, setFormData] = useState({
    propertyName: "",
    location: "",
    description: "",
    pricePerNight: "",
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/listings/${listingId}`)
      .then((response) => {
        setFormData(response.data);
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
    axios
      .put(`http://localhost:5000/api/listings/${listingId}`, formData)
      .then(() => {
        onNavigate("/seller-dashboard");
      })
      .catch((error) => {
        console.log("Error updating listing:", error);
      });
  };

  if (loading) {
    return <h2>Loading listing...</h2>;
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