import { useState } from "react";
import {
  Bath,
  BedDouble,
  Building2,
  Check,
  Clock,
  Hash,
  Home,
  ImagePlus,
  Mail,
  Map,
  MapPin,
  Phone,
  Plus,
  Ruler,
  User,
  Users,
  X,
} from "lucide-react";
import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";
import "../../css/Listing.css";

// ------------------------------------------------------------------------------------------------------------------------------
// Data Arrays for the form - property types, services, facilities, tags, and total steps in the intake flow
// ------------------------------------------------------------------------------------------------------------------------------

export const propertyTypeOptions = [
  {
    name: "Apartment",
    description: "Unit in a shared or private building",
  },
  {
    name: "Villa",
    description: "Luxury private residence",
  },
  {
    name: "House",
    description: "Standalone home or estate",
  },
  {
    name: "Cabin",
    description: "Secluded countryside stay",
  },
  {
    name: "Hotel room",
    description: "Room with hosted services",
  },
  {
    name: "Guesthouse",
    description: "Hosted rooms or suites",
  },
  {
    name: "Beach house",
    description: "Coastal home or retreat",
  },
  {
    name: "Farm stay",
    description: "Rural guest accommodation",
  },
];

export const propertyTypes = propertyTypeOptions.map((type) => type.name);

export const serviceOptions = [
  "Cleaning",
  "Airport shuttle",
  "Breakfast",
  "Laundry",
  "Security",
];

export const facilityOptions = [
  "WiFi",
  "Pool",
  "Kitchen",
  "Parking",
  "Air conditioning",
  "Sea view",
  "Washing machine",
  "Braai area",
];

export const tagOptions = [
  "Luxury",
  "Self-catering",
  "Family friendly",
  "Romantic",
  "Beachfront",
  "Pet friendly",
];

export const houseRuleSuggestions = [
  "No smoking",
  "No pets allowed",
  "No parties or events",
  "Quiet hours after 10:00 PM",
  "Check-in from 3:00 PM",
  "Check-out by 11:00 AM",
];

export const initialListingForm = {
  propertyName: "",
  propertyType: "",
  description: "",
  streetAddress: "",
  suburb: "",
  city: "",
  province: "",
  country: "",
  postalCode: "",
  location: "",
  bedrooms: "",
  bathrooms: "",
  guestCapacity: "",
  beds: "",
  area: "",
  pricePerNight: "",
  earlyBookingDiscount: false,
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
};

export const listingFormSteps = [
  {
    title: "Property Type",
    subtitle: "Choose the category that best fits your property.",
    Component: PropertyTypeSection,
  },
  {
    title: "Property Details",
    subtitle: "Title, description and full address help guests find your property.",
    Component: PropertyDetailsSection,
  },
  {
    title: "Address",
    subtitle: "Use the full address so guests know exactly where the accommodation is.",
    Component: AddressSection,
  },
  {
    title: "Rooms & Capacity",
    subtitle: "Specify bedrooms, bathrooms and guest capacity.",
    Component: RoomsCapacitySection,
  },
  {
    title: "Pricing",
    subtitle: "Set a competitive nightly rate to attract bookings.",
    Component: PricingSection,
  },
  {
    title: "Images",
    subtitle: "Upload property images and choose the thumbnail guests see first.",
    Component: ImagesSection,
  },
  {
    title: "Services & Facilities",
    subtitle: "Select the guest services, facilities and listing tags that apply.",
    Component: ServicesFacilitiesSection,
  },
  {
    title: "House Rules",
    subtitle: "Add house rules and select check-in/check-out times.",
    Component: HouseRulesSection,
  },
  {
    title: "Host Details & Add Listing",
    subtitle: "Provide host contact information and add the listing when ready.",
    Component: HostDetailsSection,
  },
];

function createFormHelpers(formData, onChange) {
  const updateField = (name, value) => {
    onChange({ target: { name, value } });
  };

  const toggleArrayOption = (name, value) => {
    const currentValues = Array.isArray(formData[name]) ? formData[name] : [];
    const nextValues = currentValues.includes(value)
      ? currentValues.filter((item) => item !== value)
      : [...currentValues, value];

    updateField(name, nextValues);
  };

  const readImageFile = (file) =>
    new Promise((resolve) => {
      const reader = new FileReader();

      reader.onload = () => {
        resolve({
          id: `${file.name}-${file.lastModified}-${file.size}`,
          name: file.name,
          preview: reader.result,
          type: file.type,
          size: file.size,
        });
      };

      reader.readAsDataURL(file);
    });

  const addImages = async (files) => {
    const currentImages = Array.isArray(formData.images) ? formData.images : [];
    const uploadedImages = await Promise.all(Array.from(files || []).map(readImageFile));

    updateField("images", [...currentImages, ...uploadedImages]);
  };

  const removeImage = (imageIndex) => {
    const currentImages = Array.isArray(formData.images) ? formData.images : [];
    updateField(
      "images",
      currentImages.filter((_, index) => index !== imageIndex)
    );
  };

  const setThumbnail = (imageIndex) => {
    const currentImages = Array.isArray(formData.images) ? formData.images : [];

    if (imageIndex <= 0 || imageIndex >= currentImages.length) {
      return;
    }

    const nextImages = [...currentImages];
    const [selectedImage] = nextImages.splice(imageIndex, 1);
    updateField("images", [selectedImage, ...nextImages]);
  };

  return {
    updateField,
    toggleArrayOption,
    addImages,
    removeImage,
    setThumbnail,
  };
}

function IconInput({ icon: Icon, children }) {
  return (
    <div className="input-with-icon">
      <Icon aria-hidden="true" />
      {children}
    </div>
  );
}

export function PropertyTypeSection({ formData, helpers }) {
  return (
    <Row className="g-3 type-card-grid">
      {propertyTypeOptions.map((type) => {
        const imageClass = type.name.toLowerCase().replace(/\s+/g, "-");

        return (
          <Col sm={6} key={type.name}>
            <Button
              type="button"
              className={`type-card w-100 ${formData.propertyType === type.name ? "selected" : ""}`}
              onClick={() => helpers.updateField("propertyType", type.name)}
            >
              <span className="type-card-media" aria-hidden="true">
                <span className={`type-card-image type-card-image-${imageClass}`} />
              </span>
              <span className="type-card-caption">
                <span className="type-card-title">{type.name}</span>
                <span className="type-card-description">{type.description}</span>
              </span>
            </Button>
          </Col>
        );
      })}
    </Row>
  );
}

export function PropertyDetailsSection({ formData, onChange }) {
  return (
    <Row className="g-3 g-md-4">
      <Col lg={6}>
        <Form.Group controlId="propertyName">
          <Form.Label>Property Name</Form.Label>
          <IconInput icon={Home}>
            <Form.Control
              type="text"
              name="propertyName"
              value={formData.propertyName || ""}
              onChange={onChange}
              placeholder="Luxury Ocean View Villa"
            />
          </IconInput>
        </Form.Group>
      </Col>

      <Col lg={6}>
        <Form.Group controlId="area">
          <Form.Label>Area (m²) (optional)</Form.Label>
          <IconInput icon={Ruler}>
            <Form.Control
              type="number"
              min={0}
              name="area"
              value={formData.area || ""}
              onChange={onChange}
              placeholder="120"
            />
          </IconInput>
        </Form.Group>
      </Col>

      <Col xs={12}>
        <Form.Group controlId="description">
          <Form.Label>Description</Form.Label>
          <Form.Control
            as="textarea"
            rows={5}
            name="description"
            value={formData.description || ""}
            onChange={onChange}
            placeholder="Describe the property, guest experience, and location."
          />
        </Form.Group>
      </Col>
    </Row>
  );
}

export function AddressSection({ formData, onChange }) {
  return (
    <Row className="g-3 g-md-4">
      <Col xs={12}>
        <Form.Group controlId="streetAddress">
          <Form.Label>Street Address</Form.Label>
          <IconInput icon={MapPin}>
            <Form.Control
              type="text"
              name="streetAddress"
              value={formData.streetAddress || ""}
              onChange={onChange}
            />
          </IconInput>
        </Form.Group>
      </Col>

      <Col md={6}>
        <Form.Group controlId="suburb">
          <Form.Label>Suburb</Form.Label>
          <IconInput icon={Home}>
            <Form.Control
              type="text"
              name="suburb"
              value={formData.suburb || ""}
              onChange={onChange}
            />
          </IconInput>
        </Form.Group>
      </Col>

      <Col md={6}>
        <Form.Group controlId="city">
          <Form.Label>City</Form.Label>
          <IconInput icon={Building2}>
            <Form.Control
              type="text"
              name="city"
              value={formData.city || ""}
              onChange={onChange}
            />
          </IconInput>
        </Form.Group>
      </Col>

      <Col md={4}>
        <Form.Group controlId="province">
          <Form.Label>Province</Form.Label>
          <IconInput icon={Map}>
            <Form.Control
              type="text"
              name="province"
              value={formData.province || ""}
              onChange={onChange}
            />
          </IconInput>
        </Form.Group>
      </Col>

      <Col md={4}>
        <Form.Group controlId="country">
          <Form.Label>Country</Form.Label>
          <IconInput icon={Map}>
            <Form.Control
              type="text"
              name="country"
              value={formData.country || ""}
              onChange={onChange}
            />
          </IconInput>
        </Form.Group>
      </Col>

      <Col md={4}>
        <Form.Group controlId="postalCode">
          <Form.Label>Postal Code</Form.Label>
          <IconInput icon={Hash}>
            <Form.Control
              type="text"
              inputMode="numeric"
              name="postalCode"
              value={formData.postalCode || ""}
              onChange={onChange}
            />
          </IconInput>
        </Form.Group>
      </Col>
    </Row>
  );
}

export function RoomsCapacitySection({ formData, onChange }) {
  return (
    <Row className="g-3 g-md-4">
      <Col md={6}>
        <Form.Group controlId="bedrooms">
          <Form.Label>Bedrooms</Form.Label>
          <IconInput icon={BedDouble}>
            <Form.Control
              type="number"
              min={0}
              max={30}
              name="bedrooms"
              value={formData.bedrooms || ""}
              onChange={onChange}
            />
          </IconInput>
        </Form.Group>
      </Col>

      <Col md={6}>
        <Form.Group controlId="bathrooms">
          <Form.Label>Bathrooms</Form.Label>
          <IconInput icon={Bath}>
            <Form.Control
              type="number"
              min={0}
              max={30}
              name="bathrooms"
              value={formData.bathrooms || ""}
              onChange={onChange}
            />
          </IconInput>
        </Form.Group>
      </Col>

      <Col md={6}>
        <Form.Group controlId="guestCapacity">
          <Form.Label>Guests</Form.Label>
          <IconInput icon={Users}>
            <Form.Control
              type="number"
              min={1}
              max={50}
              name="guestCapacity"
              value={formData.guestCapacity || formData.guests || ""}
              onChange={onChange}
            />
          </IconInput>
        </Form.Group>
      </Col>

      <Col md={6}>
        <Form.Group controlId="beds">
          <Form.Label>Beds</Form.Label>
          <IconInput icon={BedDouble}>
            <Form.Control
              type="text"
              name="beds"
              value={formData.beds || ""}
              onChange={onChange}
            />
          </IconInput>
        </Form.Group>
      </Col>
    </Row>
  );
}

export function PricingSection({ formData, onChange }) {
  const nightlyRate = Number(formData.pricePerNight) || 0;
  const commissionRate = 0.125;
  const discountRate = 0.2;
  const discountSelected = Boolean(formData.earlyBookingDiscount);
  const discountAmount = discountSelected ? nightlyRate * discountRate : 0;
  const commissionAmount = nightlyRate * commissionRate;
  const estimatedPayout = Math.max(nightlyRate - discountAmount - commissionAmount, 0);

  const formatCurrency = (value) =>
    new Intl.NumberFormat("en-ZA", {
      style: "currency",
      currency: "ZAR",
      maximumFractionDigits: 0,
    }).format(value);

  const commissionItems = [
    "Premium positioning on Deluxe Bookings",
    "Instant booking confirmations",
    "Secure payment processing",
    "24/7 dedicated support",
  ];

  return (
    <div className="pricing-main">
      <div className="competitive-pricing">
        <div>
          <p>Competitive pricing in your area:</p>
          <small>Average nightly rate for similar properties</small>
        </div>
        <span>R4,200 - R8,500</span>
      </div>

      <div className="pricing-summary-card">
        <div>
          <h4>12.5% Deluxe Bookings commission and charges</h4>
          <p>{formatCurrency(commissionAmount)} commission at your current nightly rate.</p>
        </div>
        <ul>
          {commissionItems.map((item) => (
            <li key={item}>
              <Check aria-hidden="true" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>

      <Form.Group controlId="pricePerNight">
        <Form.Label>How much do you want to charge per night?</Form.Label>
        <div className="currency-field">
          <span>ZAR</span>
          <Form.Control
            type="text"
            inputMode="numeric"
            pattern="[0-9]*"
            name="pricePerNight"
            value={formData.pricePerNight || ""}
            onChange={onChange}
            placeholder="5000"
          />
        </div>
        <p className="field-note">Including taxes, commission and charges.</p>
      </Form.Group>

      <div className="pricing-discount-field">
        <p className="pricing-question">Do you want to give early customers a discount?</p>
        <button
          type="button"
          className={`pricing-discount-selector ${discountSelected ? "selected" : ""}`}
          aria-pressed={discountSelected}
          onClick={() =>
            onChange({
              target: {
                name: "earlyBookingDiscount",
                value: !discountSelected,
              },
            })
          }
        >
          <span className="discount-checkbox" aria-hidden="true">
            {discountSelected && <Check />}
          </span>
          <span className="discount-copy">
            <span>Attract guests with a 20% early booking discount</span>
            <span>
              {formatCurrency(nightlyRate * discountRate)} promotional discount for bookings
              made 30+ days in advance.
            </span>
          </span>
        </button>
      </div>

      <div className="pricing-total-card">
        <span>Total after commission and discount</span>
        <strong>{formatCurrency(estimatedPayout)}</strong>
      </div>
    </div>
  );
}

function PricingHelpCard() {
  return (
    <aside className="pricing-help-card">
      <h4>Not sure about your price?</h4>
      <p>
        You can adjust pricing later. Start with a competitive rate and refine
        based on demand.
      </p>
    </aside>
  );
}

function PricingStepSection({ title, subtitle, children }) {
  return (
    <div className="pricing-step-layout">
      <ListingFormCard title={title} subtitle={subtitle}>
        {children}
      </ListingFormCard>
      <PricingHelpCard />
    </div>
  );
}

export function ImagesSection({ formData, helpers }) {
  const images = Array.isArray(formData.images) ? formData.images : [];
  const previewSlots = Array.from({ length: Math.max(6, images.length) });

  return (
    <div className="photo-uploader-layout">
      <div className="photo-upload-column">
        <Form.Group controlId="listingImages" className="photo-upload-group">
          <Form.Label>Property Images</Form.Label>
          <p className="field-note">
            Upload at least 1 photo. Choose a thumbnail by selecting any uploaded image.
          </p>
          <label className="photo-dropzone" htmlFor="listingImages">
            <ImagePlus aria-hidden="true" />
            <span>Drag and drop or upload files</span>
            <small>JPG, JPEG or PNG, maximum 50MB each.</small>
          </label>
          <Form.Control
            id="listingImages"
            className="photo-input"
            type="file"
            multiple
            accept="image/png,image/jpeg"
            onChange={(event) => helpers.addImages(event.target.files)}
          />
        </Form.Group>
        <p className="photo-guidance">
          Choose a thumbnail photo that will make a good first impression.
        </p>
      </div>

      <div className="photo-preview-grid" aria-label="Selected property images">
        {previewSlots.map((_, index) => {
          const image = images[index];

          if (!image) {
            return (
              <div className="photo-preview-card photo-preview-placeholder" key={`empty-${index}`}>
                <ImagePlus aria-hidden="true" />
              </div>
            );
          }

            const src = typeof image === "string" ? image : image.preview;
            const name = typeof image === "string" ? `Image ${index + 1}` : image.name;

            return (
              <figure className="photo-preview-card" key={`${name}-${index}`}>
                <button
                  type="button"
                  className="thumbnail-select-btn"
                  onClick={() => helpers.setThumbnail(index)}
                  aria-label={`Use ${name} as thumbnail`}
                  disabled={index === 0}
                >
                  <img src={src} alt={name} />
                </button>
                <Button
                  type="button"
                  className="remove-photo-btn"
                  aria-label={`Remove ${name}`}
                  onClick={() => helpers.removeImage(index)}
                >
                  <X aria-hidden="true" />
                </Button>
                {index === 0 && <figcaption>Thumbnail</figcaption>}
                {index !== 0 && <span className="set-thumbnail-hint">Set thumbnail</span>}
              </figure>
            );
          })}
      </div>
    </div>
  );
}

function OptionPill({ label, selected, onClick }) {
  return (
    <Button
      type="button"
      className={`pill option-pill ${selected ? "active" : ""}`}
      onClick={onClick}
    >
      {selected ? <X aria-hidden="true" /> : <Plus aria-hidden="true" />}
      <span>{label}</span>
    </Button>
  );
}

function OptionPillGroup({ options, selectedOptions, onToggle }) {
  return (
    <div className="pill-grid">
      {options.map((option) => (
        <OptionPill
          key={option}
          label={option}
          selected={selectedOptions.includes(option)}
          onClick={() => onToggle(option)}
        />
      ))}
    </div>
  );
}

export function ServicesFacilitiesSection({ formData, helpers }) {
  const selectedServices = Array.isArray(formData.services) ? formData.services : [];
  const selectedFacilities = Array.isArray(formData.facilities) ? formData.facilities : [];
  const selectedTags = Array.isArray(formData.tags) ? formData.tags : [];
  const [tagInput, setTagInput] = useState("");
  const cleanTagInput = tagInput.trim();
  const tagInputIsSelected = selectedTags.includes(cleanTagInput);
  const availableTagOptions = tagOptions.filter((tag) => !selectedTags.includes(tag));

  const toggleTagInput = () => {
    const nextTag = cleanTagInput;

    if (!nextTag) {
      return;
    }

    helpers.toggleArrayOption("tags", nextTag);
    setTagInput("");
  };

  return (
    <div className="fields-grid">
      <section className="option-panel">
        <h4>Services</h4>
        <OptionPillGroup
          options={serviceOptions}
          selectedOptions={selectedServices}
          onToggle={(service) => helpers.toggleArrayOption("services", service)}
        />
      </section>

      <section className="option-panel">
        <h4>Facilities</h4>
        <OptionPillGroup
          options={facilityOptions}
          selectedOptions={selectedFacilities}
          onToggle={(facility) => helpers.toggleArrayOption("facilities", facility)}
        />
      </section>

      <section className="option-panel">
        <h4>Tags</h4>
        <div className="custom-tag-row">
          <Form.Control
            name="customTag"
            type="text"
            value={tagInput}
            onChange={(event) => setTagInput(event.target.value)}
            placeholder="Create your own tag"
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                event.preventDefault();
                toggleTagInput();
              }
            }}
          />
          <Button type="button" className="add-tag-btn" onClick={toggleTagInput}>
            {tagInputIsSelected ? "Remove" : "Add"}
          </Button>
        </div>

        {selectedTags.length > 0 && (
          <div className="selected-tag-grid" aria-label="Selected tags">
            {selectedTags.map((tag) => (
              <OptionPill
                key={tag}
                label={tag}
                selected
                onClick={() => helpers.toggleArrayOption("tags", tag)}
              />
            ))}
          </div>
        )}

        <OptionPillGroup
          options={availableTagOptions}
          selectedOptions={selectedTags}
          onToggle={(tag) => helpers.toggleArrayOption("tags", tag)}
        />
      </section>
    </div>
  );
}

export function HouseRulesSection({ formData, onChange, helpers }) {
  const [ruleInput, setRuleInput] = useState("");
  const additionalRules = typeof formData.additionalRules === "string" ? formData.additionalRules : "";
  const rules = additionalRules
    .split("\n")
    .map((rule) => rule.trim())
    .filter(Boolean);
  const cleanRuleInput = ruleInput.trim();
  const availableRuleSuggestions = houseRuleSuggestions.filter((rule) => !rules.includes(rule));

  const updateRules = (nextRules) => {
    helpers.updateField("additionalRules", nextRules.join("\n"));
  };

  const toggleRule = (rule) => {
    updateRules(rules.includes(rule) ? rules.filter((item) => item !== rule) : [...rules, rule]);
  };

  const addRuleInput = () => {
    if (!cleanRuleInput) {
      return;
    }

    toggleRule(cleanRuleInput);
    setRuleInput("");
  };

  return (
    <Row className="g-3 g-md-4">
      <Col md={6}>
        <Form.Group controlId="checkInTime">
          <Form.Label>Check-in Time</Form.Label>
          <IconInput icon={Clock}>
            <Form.Control
              type="time"
              name="checkInTime"
              value={formData.checkInTime || ""}
              onChange={onChange}
            />
          </IconInput>
        </Form.Group>
      </Col>

      <Col md={6}>
        <Form.Group controlId="checkOutTime">
          <Form.Label>Check-out Time</Form.Label>
          <IconInput icon={Clock}>
            <Form.Control
              type="time"
              name="checkOutTime"
              value={formData.checkOutTime || ""}
              onChange={onChange}
            />
          </IconInput>
        </Form.Group>
      </Col>

      <Col xs={12}>
        <section className="option-panel">
          <h4>Additional Rules</h4>
          <div className="custom-tag-row">
            <Form.Control
              name="customHouseRule"
              type="text"
              value={ruleInput}
              onChange={(event) => setRuleInput(event.target.value)}
              placeholder="Add a house rule"
              onKeyDown={(event) => {
                if (event.key === "Enter") {
                  event.preventDefault();
                  addRuleInput();
                }
              }}
            />
            <Button type="button" className="add-tag-btn" onClick={addRuleInput}>
              {rules.includes(cleanRuleInput) ? "Remove" : "Add"}
            </Button>
          </div>

          {rules.length > 0 && (
            <div className="selected-tag-grid" aria-label="Additional house rules">
              {rules.map((rule) => (
                <OptionPill
                  key={rule}
                  label={rule}
                  selected
                  onClick={() => toggleRule(rule)}
                />
              ))}
            </div>
          )}

          <OptionPillGroup
            options={availableRuleSuggestions}
            selectedOptions={rules}
            onToggle={toggleRule}
          />
        </section>
      </Col>
    </Row>
  );
}

export function HostDetailsSection({ formData, onChange }) {
  return (
    <Row className="g-3 g-md-4">
      <Col md={6}>
        <Form.Group controlId="hostName">
          <Form.Label>Host Name</Form.Label>
          <IconInput icon={User}>
            <Form.Control
              type="text"
              name="hostName"
              value={formData.hostName || ""}
              onChange={onChange}
              placeholder="Eg. Jane Darling"
            />
          </IconInput>
        </Form.Group>
      </Col>

      <Col md={6}>
        <Form.Group controlId="hostPhone">
          <Form.Label>Phone Number</Form.Label>
          <IconInput icon={Phone}>
            <Form.Control
              type="tel"
              name="hostPhone"
              value={formData.hostPhone || ""}
              onChange={onChange}
              placeholder="+27 82 123 4567"
            />
          </IconInput>
        </Form.Group>      
      </Col>

      <Col xs={12}>
        <Form.Group controlId="hostEmail">
          <Form.Label>Email Address</Form.Label>
          <IconInput icon={Mail}>
            <Form.Control
              type="email"
              name="hostEmail"
              value={formData.hostEmail || ""}
              onChange={onChange}
              placeholder="Eg. luxurystays@gmail.com"
            />
          </IconInput>
        </Form.Group>
      </Col>
    </Row>
  );
}

function ListingFormCard({ title, subtitle, children }) {
  return (
    <Card className="form-card border-0">
      <Card.Body>
        <section className="fields-grid">
          <div className="form-header">
            <h4>{title}</h4>
            <p className="form-subtitle">{subtitle}</p>
          </div>
          {children}
        </section>
      </Card.Body>
    </Card>
  );
}

export function ListingFormSection({ step, formData, onChange }) {
  const { title, subtitle, Component } = listingFormSteps[step];
  const helpers = createFormHelpers(formData, onChange);
  const content = <Component formData={formData} onChange={onChange} helpers={helpers} />;

  if (Component === PricingSection) {
    return (
      <PricingStepSection title={title} subtitle={subtitle}>
        {content}
      </PricingStepSection>
    );
  }

  return (
    <ListingFormCard title={title} subtitle={subtitle}>
      {content}
    </ListingFormCard>
  );
}

function ListingForm({ formData, onChange, onSubmit, submitLabel }) {
  return (
    <main className="create-listing-page edit-listing-page">
      <Container fluid="lg" className="create-listing-shell">
        <div className="form-header">
          <p className="brand-label">Deluxe host</p>
          <h2>Property Details</h2>
          <p className="form-subtitle">Review and update the complete listing information guests see.</p>
        </div>

        <Form className="fields-grid">
          {listingFormSteps.map((step, index) => (
            <ListingFormSection
              key={step.title}
              step={index}
              formData={formData}
              onChange={onChange}
            />
          ))}

          <div className="form-actions justify-content-end">
            <Button type="button" className="publish-button" onClick={onSubmit}>
              {submitLabel}
            </Button>
          </div>
        </Form>
      </Container>
    </main>
  );
}

export default ListingForm;
