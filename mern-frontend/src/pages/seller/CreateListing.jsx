

import { useState } from "react";

import { Button, Container, Form, ProgressBar } from "react-bootstrap";

import {
  initialListingForm,
  ListingFormSection,
  listingFormSteps,
} from "../../components/seller/ListingForm";

import { createSellerListing } from "../../api/sellerApi";

import {
  getListingDraft,
  saveListingDraft,
  clearListingDraft,
} from "../../utils/listingStorage";

import "../../css/seller/Listing.css";

const getSavedDraft = () => getListingDraft();

const buildListingPayload = (formData) => {
  const location = [
    formData.streetAddress,
    formData.suburb,
    formData.city,
    formData.province,
    formData.country,
    formData.postalCode,
  ]
    .filter(Boolean)
    .join(", ");

  return {
    ...formData,
    location: location || formData.location,
    image: formData.images?.[0]?.preview || formData.images?.[0] || "",
    bedrooms: formData.bedrooms ? Number(formData.bedrooms) : "",
    bathrooms: formData.bathrooms ? Number(formData.bathrooms) : "",
    guestCapacity: formData.guestCapacity ? Number(formData.guestCapacity) : "",
    pricePerNight: formData.pricePerNight ? Number(formData.pricePerNight) : "",
    isFullyBooked: Boolean(formData.isFullyBooked),
  };
};

function CreateListing({ onNavigate }) {
  const savedDraft = getSavedDraft();
  const [currentStep, setCurrentStep] = useState(savedDraft?.currentStep || 0);
  const [formData, setFormData] = useState({
    ...initialListingForm,
    ...(savedDraft?.formData || {}),
  });
  const [successListing, setSuccessListing] = useState(null);

  const handleListingFormChange = (event) => {
    const { name, value } = event.target;

    setFormData((current) => ({
      ...current,
      [name]: value,
    }));
  };

  const saveDraft = () => {
    saveListingDraft({ formData, currentStep });
  };

  const handleSaveAndExit = () => {
    saveDraft();
    onNavigate("/seller/dashboard");
  };

  const addListing = async () => {
    const token = localStorage.getItem("deluxe_token");

    if (!token) {
      onNavigate("/");
      return;
    }

    try {
      const listing = await createMySellerListing(
        buildListingPayload(formData),
        token,
      );
      clearListingDraft();
      setSuccessListing(listing);
    } catch (error) {
      console.log("Error creating listing:", error);
    }
  };

  const goNext = () => {
    setCurrentStep((step) => Math.min(step + 1, listingFormSteps.length - 1));
  };

  const goBack = () => {
    setCurrentStep((step) => Math.max(step - 1, 0));
  };

  const stepNumber = currentStep + 1;
  const totalSteps = listingFormSteps.length;

  if (successListing) {
    return (
      <main className="create-listing-page">
        <Container fluid="lg" className="create-listing-shell">
          <section className="listing-success-card">
            <p className="brand-label">Intake submitted</p>
            <h1>Thank you. Your listing is being reviewed.</h1>
            <p>
              We saved {successListing.propertyName || "your property"} to your
              seller dashboard. The Deluxe team will process and review the
              intake before it goes live.
            </p>
            <Button
              className="continue-button"
              type="button"
              onClick={() => onNavigate("/seller/dashboard")}
            >
              Go to Dashboard
            </Button>
          </section>
        </Container>
      </main>
    );
  }

  return (
    <main className="create-listing-page">
      <Container fluid="lg" className="create-listing-shell">
        <div className="intake-page-heading">
          <h1 className="intake-page-title">List Your Property</h1>
        </div>

        <p className="step-text">
          Progress: {stepNumber}/{totalSteps}
        </p>
        <ProgressBar
          className="progress-bar-outer"
          now={(stepNumber / totalSteps) * 100}
        />

        <Form className="fields-grid intake-step-form">
          <ListingFormSection
            step={currentStep}
            formData={formData}
            onChange={handleListingFormChange}
          />

          <div className="form-actions">
            <Button
              type="button"
              className="save-exit-btn"
              onClick={goBack}
              disabled={currentStep === 0}
            >
              Back
            </Button>
            
            <div className="action-group">
              <Button
                type="button"
                className="back-button"
                onClick={handleSaveAndExit}
              >
                Save & Exit
              </Button>
              {currentStep < totalSteps - 1 ? (
                <Button
                  type="button"
                  className="continue-button"
                  onClick={goNext}
                >
                  Continue
                </Button>
              ) : (
                <Button
                  type="button"
                  className="publish-button"
                  onClick={addListing}
                >
                  Add Listing
                </Button>
              )}
            </div>
          </div>
        </Form>
      </Container>
    </main>
  );
}

export default CreateListing;
