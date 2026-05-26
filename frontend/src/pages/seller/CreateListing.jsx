// ======================================================================================
// STEP 1: IMPORT PAGES AND COMPONENTS
// ======================================================================================

import { useState } from "react";
import axios from "axios";
import ListingForm from "../../components/seller/ListingForm";
import "../../css/CreateListing.css";

// ------------------------------------------------------------------------------------------------------------------------------
// Data Arrays for the form - property types, services, facilities, tags, and total steps in the intake flow
// ------------------------------------------------------------------------------------------------------------------------------

const propertyTypes = [
  "Apartment",
  "Villa",
  "House",
  "Cabin",
  "Hotel room",
  "Guesthouse",
  "Beach house",
  "Farm stay",
];

const serviceOptions = [
  "Cleaning",
  "Airport shuttle",
  "Breakfast",
  "Laundry",
  "Security",
];

const facilityOptions = [
  "WiFi",
  "Pool",
  "Kitchen",
  "Parking",
  "Air conditioning",
  "Sea view",
  "Washing machine",
  "Braai area",
];

const tagOptions = [
  "Luxury",
  "Self-catering",
  "Family friendly",
  "Romantic",
  "Beachfront",
  "Pet friendly",
];

// This tells the intake flow that there are 7 pages/steps.
const totalSteps = 7;

function CreateListing({ onNavigate }) {

  const [currentStep, setCurrentStep] = useState(1);
  const [publishError, setPublishError] = useState("");
  const [summaryError, setSummaryError] = useState("");
  const [imagePreviews, setImagePreviews] = useState(Array(6).fill(""));
  const [formData, setFormData] = useState({
    
    propertyName: "",
    propertyType: "",
    description: "",
    
    // address parts
    streetAddress: "",
    suburb: "",
    city: "",
    province: "",
    country: "",
    postalCode: "",
    location: "", // assembled before submit
    bedrooms: "",
    bathrooms: "",
    guests: "",
    beds: "",
    area: "",
    pricePerNight: "",
    images: [],
    hostName: "",
    hostEmail: "",
    hostPhone: "",
    checkInTime: "",
    checkOutTime: "",
    additionalRules: "",
    services: [],
    facilities: [],
    tags: [],
    isFullyBooked: false,
  });

  const [touched, setTouched] = useState({});
  const [errors, setErrors] = useState({});

  // helpers
  const setField = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const onBlur = (field) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    const stepErrors = validateStep(currentStep, formData);
    setErrors((prev) => ({ ...prev, ...stepErrors }));
  };

  const isEmailValid = (email) => /^\S+@\S+\.\S+$/.test(email);
  const isPhoneValid = (phone) => {
    if (!phone) return false;
    // Accept +27 or leading 0 formats with optional spaces/dashes
    const cleaned = phone.replace(/[\s-]/g, "");
    return /^(?:\+27|0)\d{9}$/.test(cleaned);
  };

  const handleTypeSelect = (type) => setField("propertyType", type);

  const handleOptionToggle = (field, value) => {
    setFormData((prev) => {
      const selected = prev[field] || [];
      const next = selected.includes(value) ? selected.filter((o) => o !== value) : [...selected, value];
      return { ...prev, [field]: next };
    });
  };

  const handleImageChange = (index) => (event) => {
    const file = event.target.files?.[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    setImagePreviews((prev) => {
      const next = [...prev];
      next[index] = url;
      setFormData((cur) => ({ ...cur, images: next.filter(Boolean) }));
      return next;
    });
  };

  // Validation per step - returns object with field: message
  const validateStep = (step, data) => {
    const e = {};
    if (step === 1) {
      if (!data.propertyType) e.propertyType = "Property type is required.";
    }

    if (step === 2) {
      if (!data.propertyName || data.propertyName.trim().length < 3) e.propertyName = "Enter a title (3+ characters).";
      if (data.propertyName && data.propertyName.length > 80) e.propertyName = "Title must be 80 characters or fewer.";
      if (!data.description || data.description.trim().length < 30) e.description = "Describe the property (30+ characters).";
      if (data.description && data.description.length > 1000) e.description = "Description must be 1000 characters or fewer.";
      // address parts
      if (!data.streetAddress) e.streetAddress = "Street address is required.";
      if (!data.city) e.city = "City is required.";
      if (!data.province) e.province = "Province is required.";
      if (!data.country) e.country = "Country is required.";
      if (!data.postalCode) e.postalCode = "Postal code is required.";
      if (data.postalCode && !/^\d+$/.test(data.postalCode)) e.postalCode = "Postal code must contain only numbers.";
    }

    if (step === 3) {
      if (!data.bedrooms && data.bedrooms !== 0) e.bedrooms = "Bedrooms is required.";
      else if (Number(data.bedrooms) < 0 || Number(data.bedrooms) > 30) e.bedrooms = "Enter 0-30.";
      if (!data.bathrooms && data.bathrooms !== 0) e.bathrooms = "Bathrooms is required.";
      else if (Number(data.bathrooms) < 0 || Number(data.bathrooms) > 30) e.bathrooms = "Enter 0-30.";
      if (!data.guests) e.guests = "Guest capacity is required.";
      else if (Number(data.guests) < 1 || Number(data.guests) > 50) e.guests = "Enter 1-50.";
    }

    if (step === 4) {
      if (!data.pricePerNight) e.pricePerNight = "Price per night is required.";
      else if (Number(data.pricePerNight) < 1 || Number(data.pricePerNight) > 100000) e.pricePerNight = "Enter a value between 1 and 100000.";
    }

    if (step === 5) {
      // images recommended but optional; require at least 1 for better UX
      if (!data.images || data.images.length === 0) e.images = "Please upload at least one photo (recommended).";
    }

    if (step === 6) {
      if (!data.checkInTime) e.checkInTime = "Check-in time is required.";
      if (!data.checkOutTime) e.checkOutTime = "Check-out time is required.";
    }

    if (step === 7) {
      if (!data.hostName) e.hostName = "Host name is required.";
      if (!data.hostEmail) e.hostEmail = "Host email is required.";
      else if (!isEmailValid(data.hostEmail)) e.hostEmail = "Enter a valid email address.";
      if (!data.hostPhone) e.hostPhone = "Host phone is required.";
      else if (!isPhoneValid(data.hostPhone)) e.hostPhone = "Enter a valid phone (e.g., 082 123 4567 or +27 82 123 4567).";
    }

    return e;
  };

  const goNext = () => {
    setSummaryError("");
    const stepErrors = validateStep(currentStep, formData);
    if (Object.keys(stepErrors).length) {
      setErrors((prev) => ({ ...prev, ...stepErrors }));
      // mark touched
      const newTouched = { ...touched };
      Object.keys(stepErrors).forEach((k) => (newTouched[k] = true));
      setTouched(newTouched);
      setSummaryError("Please fix the highlighted fields before continuing.");
      return;
    }
    if (currentStep < totalSteps) setCurrentStep((s) => s + 1);
  };

  const goBack = () => {
    setSummaryError("");
    if (currentStep > 1) setCurrentStep((s) => s - 1);
  };

  const validateAll = () => {
    const allErrors = {
      ...validateStep(1, formData),
      ...validateStep(2, formData),
      ...validateStep(3, formData),
      ...validateStep(4, formData),
      ...validateStep(5, formData),
      ...validateStep(6, formData),
      ...validateStep(7, formData),
    };
    setErrors(allErrors);
    Object.keys(allErrors).forEach((k) => (touched[k] = true));
    setTouched({ ...touched });
    return allErrors;
  };

  const publishListing = async () => {
    setPublishError("");
    const allErrors = validateAll();
    if (Object.keys(allErrors).length) {
      setSummaryError("Please fix the highlighted fields before publishing.");
      return;
    }

    // assemble location string
    const location = `${formData.streetAddress}, ${formData.suburb || ""}, ${formData.city}, ${formData.province}, ${formData.country}, ${formData.postalCode}`.replace(/,\s+,/g, ", ").replace(/^(, )+|(, )+$/g, "").trim();

    const payload = {
      propertyName: formData.propertyName,
      propertyType: formData.propertyType,
      description: formData.description,
      streetAddress: formData.streetAddress,
      suburb: formData.suburb,
      city: formData.city,
      province: formData.province,
      country: formData.country,
      postalCode: formData.postalCode,
      location,
      bedrooms: Number(formData.bedrooms),
      bathrooms: Number(formData.bathrooms),
      guestCapacity: Number(formData.guests),
      beds: formData.beds,
      area: formData.area,
      pricePerNight: Number(formData.pricePerNight),
      images: formData.images,
      hostName: formData.hostName,
      hostEmail: formData.hostEmail,
      hostPhone: formData.hostPhone,
      checkInTime: formData.checkInTime,
      checkOutTime: formData.checkOutTime,
      additionalRules: formData.additionalRules,
      services: formData.services,
      facilities: formData.facilities,
      tags: formData.tags,
      isFullyBooked: !!formData.isFullyBooked,
    };

    try {
      await axios.post("http://localhost:5000/api/listings", payload);
      onNavigate("/");
    } catch (error) {
      console.error("Publish error:", error);
      setPublishError("Could not publish listing. Please try again.");
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="section-grid">
            {propertyTypes.map((type) => (
              <button
                key={type}
                type="button"
                className={`type-card ${formData.propertyType === type ? "selected" : ""}`}
                onClick={() => handleTypeSelect(type)}
              >
                {type}
              </button>
            ))}
          </div>
        );
      case 2:
        return (
          <div className="fields-grid">
            <label>
              Property Title <span className="required-label">Required</span>
              <input
                value={formData.propertyName}
                onChange={(e) => setField("propertyName", e.target.value)}
                onBlur={() => onBlur("propertyName")}
                placeholder="e.g., Luxury Ocean View Villa with Pool"
                className={touched.propertyName && errors.propertyName ? "input-error" : ""}
              />
              <div className="helper-text">Enter the public name guests will see.</div>
              {touched.propertyName && errors.propertyName && <div className="field-error">{errors.propertyName}</div>}
            </label>

            <label className="full-width">
              Description <span className="required-label">Required</span>
              <textarea
                value={formData.description}
                onChange={(e) => setField("description", e.target.value)}
                onBlur={() => onBlur("description")}
                placeholder="Describe the property, location, atmosphere and what makes it special."
                rows={6}
                className={touched.description && errors.description ? "input-error" : ""}
              />
              <div className="helper-text">Describe the property, location, atmosphere and what makes it special.</div>
              <div className="char-count">{formData.description.length} / 1000</div>
              {touched.description && errors.description && <div className="field-error">{errors.description}</div>}
            </label>

            <div className="address-block">
              <h4>Address</h4>
              <div className="helper-text">Use the full address so guests know exactly where the accommodation is.</div>
              <label>
                Street Address <span className="required-label">Required</span>
                <input
                  value={formData.streetAddress}
                  onChange={(e) => setField("streetAddress", e.target.value)}
                  onBlur={() => onBlur("streetAddress")}
                  className={touched.streetAddress && errors.streetAddress ? "input-error" : ""}
                />
                {touched.streetAddress && errors.streetAddress && <div className="field-error">{errors.streetAddress}</div>}
              </label>

              <label>
                Suburb <span className="optional-label">Optional</span>
                <input
                  value={formData.suburb}
                  onChange={(e) => setField("suburb", e.target.value)}
                />
              </label>

              <div className="split-grid">
                <label>
                  City <span className="required-label">Required</span>
                  <input
                    value={formData.city}
                    onChange={(e) => setField("city", e.target.value)}
                    onBlur={() => onBlur("city")}
                    className={touched.city && errors.city ? "input-error" : ""}
                  />
                  {touched.city && errors.city && <div className="field-error">{errors.city}</div>}
                </label>

                <label>
                  Province <span className="required-label">Required</span>
                  <input
                    value={formData.province}
                    onChange={(e) => setField("province", e.target.value)}
                    onBlur={() => onBlur("province")}
                    className={touched.province && errors.province ? "input-error" : ""}
                  />
                  {touched.province && errors.province && <div className="field-error">{errors.province}</div>}
                </label>
              </div>

              <div className="split-grid">
                <label>
                  Country <span className="required-label">Required</span>
                  <input
                    value={formData.country}
                    onChange={(e) => setField("country", e.target.value)}
                    onBlur={() => onBlur("country")}
                    className={touched.country && errors.country ? "input-error" : ""}
                  />
                  {touched.country && errors.country && <div className="field-error">{errors.country}</div>}
                </label>

                <label>
                  Postal Code <span className="required-label">Required</span>
                  <input
                    value={formData.postalCode}
                    onChange={(e) => setField("postalCode", e.target.value)}
                    onBlur={() => onBlur("postalCode")}
                    className={touched.postalCode && errors.postalCode ? "input-error" : ""}
                    inputMode="numeric"
                  />
                  {touched.postalCode && errors.postalCode && <div className="field-error">{errors.postalCode}</div>}
                </label>
              </div>
            </div>
          </div>
        );
      case 3:
        return (
          <div className="fields-grid">
            <div className="split-grid">
              <label>
                Bedrooms <span className="required-label">Required</span>
                <input
                  type="number"
                  min={0}
                  max={30}
                  value={formData.bedrooms}
                  onChange={(e) => setField("bedrooms", e.target.value)}
                  onBlur={() => onBlur("bedrooms")}
                  className={touched.bedrooms && errors.bedrooms ? "input-error" : ""}
                />
                {touched.bedrooms && errors.bedrooms && <div className="field-error">{errors.bedrooms}</div>}
              </label>

              <label>
                Bathrooms <span className="required-label">Required</span>
                <input
                  type="number"
                  min={0}
                  max={30}
                  value={formData.bathrooms}
                  onChange={(e) => setField("bathrooms", e.target.value)}
                  onBlur={() => onBlur("bathrooms")}
                  className={touched.bathrooms && errors.bathrooms ? "input-error" : ""}
                />
                {touched.bathrooms && errors.bathrooms && <div className="field-error">{errors.bathrooms}</div>}
              </label>
            </div>

            <div className="split-grid">
              <label>
                Guests (capacity) <span className="required-label">Required</span>
                <input
                  type="number"
                  min={1}
                  max={50}
                  value={formData.guests}
                  onChange={(e) => setField("guests", e.target.value)}
                  onBlur={() => onBlur("guests")}
                  className={touched.guests && errors.guests ? "input-error" : ""}
                />
                {touched.guests && errors.guests && <div className="field-error">{errors.guests}</div>}
              </label>

              <label>
                Beds <span className="optional-label">Optional</span>
                <input value={formData.beds} onChange={(e) => setField("beds", e.target.value)} />
              </label>
            </div>
          </div>
        );
      case 4:
        return (
          <div className="fields-grid">
            <label className="full-width">
              Price per Night <span className="required-label">Required</span>
              <div className="currency-row">
                <span>ZAR</span>
                <input
                  type="number"
                  min={1}
                  max={100000}
                  value={formData.pricePerNight}
                  onChange={(e) => setField("pricePerNight", e.target.value)}
                  onBlur={() => onBlur("pricePerNight")}
                  className={touched.pricePerNight && errors.pricePerNight ? "input-error" : ""}
                />
              </div>
              <div className="helper-text">Enter the price per night in rand.</div>
              {touched.pricePerNight && errors.pricePerNight && <div className="field-error">{errors.pricePerNight}</div>}
            </label>
          </div>
        );
      case 5:
        return (
          <div>
            <div className="photo-grid">
              {imagePreviews.map((preview, index) => (
                <label key={index} className="photo-card">
                  {preview ? (
                    <img src={preview} alt={`Preview ${index + 1}`} className="photo-preview" />
                  ) : (
                    <div className="photo-placeholder">
                      <div className="photo-icon">⬆</div>
                      <span>Upload</span>
                    </div>
                  )}
                  <input type="file" accept="image/*" onChange={handleImageChange(index)} className="photo-input" />
                </label>
              ))}
            </div>
            {touched.images && errors.images && <div className="field-error">{errors.images}</div>}

            <div className="amenities-section">
              <h4>Services</h4>
              <div className="pill-grid">
                {serviceOptions.map((s) => (
                  <button
                    key={s}
                    type="button"
                    className={`pill ${formData.services.includes(s) ? "active" : ""}`}
                    onClick={() => handleOptionToggle("services", s)}
                  >
                    {s}
                  </button>
                ))}
              </div>

              <h4>Facilities</h4>
              <div className="pill-grid">
                {facilityOptions.map((f) => (
                  <button
                    key={f}
                    type="button"
                    className={`pill ${formData.facilities.includes(f) ? "active" : ""}`}
                    onClick={() => handleOptionToggle("facilities", f)}
                  >
                    {f}
                  </button>
                ))}
              </div>

              <h4>Tags</h4>
              <div className="pill-grid">
                {tagOptions.map((t) => (
                  <button
                    key={t}
                    type="button"
                    className={`pill ${formData.tags.includes(t) ? "active" : ""}`}
                    onClick={() => handleOptionToggle("tags", t)}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>
          </div>
        );
      case 6:
        return (
          <div className="fields-grid">
            <div className="house-rules-card">
              <h3>House Rules</h3>
              <div className="split-grid">
                <label>
                  Check-in Time <span className="required-label">Required</span>
                  <input
                    type="time"
                    value={formData.checkInTime}
                    onChange={(e) => setField("checkInTime", e.target.value)}
                    onBlur={() => onBlur("checkInTime")}
                    className={touched.checkInTime && errors.checkInTime ? "input-error" : ""}
                  />
                  <div className="helper-text">Select a valid time using the time picker.</div>
                  {touched.checkInTime && errors.checkInTime && <div className="field-error">{errors.checkInTime}</div>}
                </label>

                <label>
                  Check-out Time <span className="required-label">Required</span>
                  <input
                    type="time"
                    value={formData.checkOutTime}
                    onChange={(e) => setField("checkOutTime", e.target.value)}
                    onBlur={() => onBlur("checkOutTime")}
                    className={touched.checkOutTime && errors.checkOutTime ? "input-error" : ""}
                  />
                  {touched.checkOutTime && errors.checkOutTime && <div className="field-error">{errors.checkOutTime}</div>}
                </label>
              </div>

              <label className="full-width">
                Additional Rules <span className="optional-label">Optional</span>
                <textarea value={formData.additionalRules} onChange={(e) => setField("additionalRules", e.target.value)} rows={3} />
              </label>
            </div>
          </div>
        );
      case 7:
        return (
          <div className="fields-grid">
            <label>
              Host Name <span className="required-label">Required</span>
              <input
                value={formData.hostName}
                onChange={(e) => setField("hostName", e.target.value)}
                onBlur={() => onBlur("hostName")}
                className={touched.hostName && errors.hostName ? "input-error" : ""}
              />
              {touched.hostName && errors.hostName && <div className="field-error">{errors.hostName}</div>}
            </label>

            <label>
              Email Address <span className="required-label">Required</span>
              <input
                type="email"
                value={formData.hostEmail}
                onChange={(e) => setField("hostEmail", e.target.value)}
                onBlur={() => onBlur("hostEmail")}
                className={touched.hostEmail && errors.hostEmail ? "input-error" : ""}
              />
              <div className="helper-text">We’ll use this for host communication.</div>
              {touched.hostEmail && errors.hostEmail && <div className="field-error">{errors.hostEmail}</div>}
            </label>

            <label className="full-width">
              Phone Number <span className="required-label">Required</span>
              <input
                type="tel"
                value={formData.hostPhone}
                onChange={(e) => setField("hostPhone", e.target.value)}
                onBlur={() => onBlur("hostPhone")}
                className={touched.hostPhone && errors.hostPhone ? "input-error" : ""}
                placeholder="082 123 4567 or +27 82 123 4567"
              />
              <div className="helper-text">Use a valid phone number, for example 082 123 4567 or +27 82 123 4567.</div>
              {touched.hostPhone && errors.hostPhone && <div className="field-error">{errors.hostPhone}</div>}
            </label>

            <label className="full-width">
              <label className="checkbox-inline">
                <input type="checkbox" checked={formData.isFullyBooked} onChange={(e) => setField("isFullyBooked", e.target.checked)} />
                Mark this listing as fully booked
              </label>
            </label>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="create-listing-page">
      <div className="create-listing-shell">
        <div className="page-header">
          <div>
            <p className="brand-label">Deluxe</p>
            <h1>List Your Property</h1>
            <p className="step-text">Progress: {currentStep}/{totalSteps}</p>
            {summaryError && <div className="summary-error">{summaryError}</div>}
          </div>
          <button className="save-exit-btn" type="button" onClick={() => onNavigate("/")}>Save & Exit</button>
        </div>

        <div className="progress-bar-outer">
          <div className="progress-bar-inner" style={{ width: `${(currentStep / totalSteps) * 100}%` }} />
        </div>

        <div className="form-card">
          <div className="form-header">
            <h2>
              {currentStep === 1 && "Property Type"}
              {currentStep === 2 && "Property Details"}
              {currentStep === 3 && "Property Details - Rooms"}
              {currentStep === 4 && "Pricing"}
              {currentStep === 5 && "Photos & Amenities"}
              {currentStep === 6 && "House Rules"}
              {currentStep === 7 && "Host Details & Publish"}
            </h2>
            <p className="form-subtitle">
              {currentStep === 1 && "Choose the category that best fits your property."}
              {currentStep === 2 && "Title, description and full address help guests find your property."}
              {currentStep === 3 && "Specify bedrooms, bathrooms and guest capacity."}
              {currentStep === 4 && "Set a competitive nightly rate to attract bookings."}
              {currentStep === 5 && "Add photos and select services, facilities and tags."}
              {currentStep === 6 && "Add house rules and select check-in/check-out times."}
              {currentStep === 7 && "Provide host contact information and publish when ready."}
            </p>
          </div>

          {renderStepContent()}

          {publishError && <p className="error-text">{publishError}</p>}

          <div className="form-actions">
            <button type="button" className="secondary-button" onClick={() => onNavigate("/")}>Save & Exit</button>
            <div className="action-group">
              <button type="button" className="back-button" onClick={goBack} disabled={currentStep === 1}>Back</button>
              {currentStep < totalSteps ? (
                <button type="button" className="continue-button" onClick={goNext}>Continue</button>
              ) : (
                <button type="button" className="publish-button" onClick={publishListing}>Publish</button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreateListing;
