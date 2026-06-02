import { useEffect, useState } from "react";
import { Alert, Container, Spinner } from "react-bootstrap";
import {
  CheckCircle2,
  Coffee,
  Dumbbell,
  Bath,
  BedDouble,
  House,
  MapPin,
  Pin,
  Star,
  Tv,
  Users,
  Waves,
  Wifi,
  XCircle,
} from "lucide-react";
import heroImage from "../../assets/pexels-pixabay-210574.jpg";
import detailImageOne from "../../assets/pexels-ben-mack-6775268.jpg";
import detailImageTwo from "../../assets/pexels-ahmetcotur-19084169.jpg";
import detailImageThree from "../../assets/pexels-fotografiagmazg-27051764.jpg";
import detailImageFour from "../../assets/pexels-rdne-8293776.jpg";
import { getMySellerListing } from "../../api/sellerApi";
import "../../css/IndividualListing.css";

const galleryImages = [
  detailImageOne,
  detailImageTwo,
  detailImageThree,
  detailImageFour,
];

const houseRules = [
  "No smoking",
  "Check-in: 3:00 PM",
  "No parties or events",
  "Check-out: 11:00 AM",
  "No pets allowed",
  "Quiet hours: 10:00 PM - 7:00 AM",
];

const amenities = [
  { label: "High-speed WiFi", Icon: Wifi },
  { label: "Air Conditioning", Icon: Waves },
  { label: "Smart TV", Icon: Tv },
  { label: "Coffee Maker", Icon: Coffee },
  { label: "Pool Access", Icon: Waves },
  { label: "Gym Access", Icon: Dumbbell },
];

function getStatusAction(status = "") {
  if (status === "published") {
    return {
      label: "Unpublish",
      variant: "danger",
    };
  }

  if (status === "approved_unpublished") {
    return {
      label: "Publish",
      variant: "primary",
    };
  }

  if (status === "unpublished") {
    return {
      label: "Resubmit",
      variant: "primary",
    };
  }

  if (status === "submitted_for_review" || status === "in_review") {
    return {
      label: "Cancel Submission",
      variant: "danger",
    };
  }

  return null;
}

function getDisplayLocation(listing = {}) {
  const location =
    listing.location ||
    [listing.city, listing.province].filter(Boolean).join(", ");

  return location
    .split(",")
    .map((part) => part.trim())
    .filter(
      (part) =>
        part &&
        part.toLowerCase() !== listing.country?.toLowerCase() &&
        part.toLowerCase() !== "south africa",
    )
    .join(", ");
}

function getAmenityIcon(label = "") {
  const normalizedLabel = label.toLowerCase();

  if (normalizedLabel.includes("wifi")) return Wifi;
  if (normalizedLabel.includes("pool") || normalizedLabel.includes("sea")) {
    return Waves;
  }
  if (normalizedLabel.includes("gym")) return Dumbbell;
  if (normalizedLabel.includes("coffee") || normalizedLabel.includes("breakfast")) {
    return Coffee;
  }
  if (normalizedLabel.includes("tv")) return Tv;

  return CheckCircle2;
}

function IndividualListing({
  listing: initialListing,
  listingId,
  fetchSellerListing = false,
  onClose,
  onEdit,
  onNavigate,
  onStatusChange,
}) {
  const [fetchedListing, setFetchedListing] = useState(null);
  const [loadingListing, setLoadingListing] = useState(false);
  const [listingError, setListingError] = useState("");
  const listing = fetchSellerListing ? fetchedListing : initialListing;

  useEffect(() => {
    if (!fetchSellerListing || !listingId) return;

    const fetchListing = async () => {
      const token = localStorage.getItem("deluxe_token");

      setLoadingListing(true);
      setListingError("");

      if (!token) {
        setListingError("You need to be logged in to view this listing.");
        setLoadingListing(false);
        return;
      }

      try {
        const data = await getMySellerListing(listingId, token);

        setFetchedListing(data);
      } catch (error) {
        console.log("Error fetching seller listing:", error);
        setListingError("Could not load this listing.");
      } finally {
        setLoadingListing(false);
      }
    };

    fetchListing();
  }, [fetchSellerListing, listingId]);

  const handleClose = () => {
    if (onClose) {
      onClose();
      return;
    }

    onNavigate?.("/seller/dashboard");
  };

  const handleEdit = () => {
    if (!listing?._id) return;

    if (onEdit) {
      onEdit(listing._id);
      return;
    }

    onNavigate?.(`/seller/edit-listing/${listing._id}`);
  };

  if (loadingListing) {
    return (
      <main className="seller-listing-detail-page">
        <Container fluid="lg" className="individual-listing-shell">
          <div className="seller-listing-detail-loading">
            <Spinner animation="border" role="status" />
            <span>Loading listing details...</span>
          </div>
        </Container>
      </main>
    );
  }

  if (listingError) {
    return (
      <main className="seller-listing-detail-page">
        <Container fluid="lg" className="individual-listing-shell">
          <Alert variant="warning" className="seller-listing-detail-alert">
            {listingError}
          </Alert>
          <button
            type="button"
            className="detail-pane-action detail-pane-action-secondary"
            onClick={handleClose}
          >
            Back to Dashboard
          </button>
        </Container>
      </main>
    );
  }

  const gallery = [
    listing?.image,
    ...(listing?.images || []),
    ...galleryImages,
  ].filter(Boolean);
  const hero = gallery[0] || heroImage;
  const galleryStack = gallery.slice(1, 5);
  const displayLocation = getDisplayLocation(listing);
  const listingAmenities = listing?.facilities?.length
    ? listing.facilities.map((label) => ({
        label,
        Icon: getAmenityIcon(label),
      }))
    : amenities;
  const statusAction = getStatusAction(listing?.status);
  const isStandalonePage = fetchSellerListing;

  return (
    <main
      className={
        isStandalonePage
          ? "seller-listing-detail-page"
          : "seller-listing-detail-pane"
      }
    >
      <Container fluid="lg" className="individual-listing-shell">
        <div className="detail-pane-actions">
          <button
            type="button"
            className="detail-pane-action detail-pane-action-secondary"
            onClick={handleEdit}
          >
            Edit
          </button>

          {statusAction && onStatusChange && (
            <button
              type="button"
              className={`detail-pane-action ${
                statusAction.variant === "danger"
                  ? "detail-pane-action-danger"
                  : "detail-pane-action-primary"
              }`}
              onClick={() => onStatusChange?.(listing._id, listing.status)}
            >
              {statusAction.label}
            </button>
          )}

          <button
            type="button"
            className="detail-pane-close"
            onClick={handleClose}
            aria-label={
              isStandalonePage ? "Back to dashboard" : "Close listing details"
            }
          >
            ×
          </button>
        </div>

        <section className="listing-hero-block">
          <h1>{listing?.propertyName || "Listing details"}</h1>
          <div className="listing-meta-row">
            <span>
              <Star aria-hidden="true" /> 4.9 (143 reviews)
            </span>
            <span>
              <MapPin aria-hidden="true" /> {displayLocation || "Location TBC"}
            </span>
          </div>
        </section>

        <section className="listing-gallery" aria-label="Property gallery">
          <div className="listing-gallery-frame">
            <div className="listing-gallery-main-wrap">
              <img
                className="listing-gallery-main"
                src={hero}
                alt={listing?.propertyName || "Listing"}
              />
            </div>
            <div className="listing-gallery-stack">
              {galleryStack.map((image, index) => (
                <img
                  src={image}
                  alt={`Property detail ${index + 1}`}
                  key={`${image}-${index}`}
                />
              ))}
            </div>
          </div>
        </section>

        <div className="listing-content-grid">
          <div className="listing-main-content">
            <section className="listing-info-card">
              <h2>Hosted by Seaside Stays</h2>
              <div className="listing-facts">
                <span>
                  <Users aria-hidden="true" /> {listing?.guestCapacity || 0} guests
                </span>
                <span>
                  <BedDouble aria-hidden="true" /> {listing?.bedrooms || 0} bedrooms
                </span>
                <span>
                  <Bath aria-hidden="true" /> {listing?.bathrooms || 0} bathrooms
                </span>
                <span>
                  <House aria-hidden="true" /> {listing?.propertyType || "Property"}
                </span>
              </div>
              <hr />
              <h3>About this place</h3>
              <p>
                {listing?.description ||
                  "This listing is being prepared by the host."}
              </p>
            </section>

            <section className="listing-info-card">
              <h2>House Rules</h2>
              <ul className="rule-list">
                {houseRules.map((rule) => {
                  const Icon = rule.toLowerCase().startsWith("no")
                    ? XCircle
                    : CheckCircle2;

                  return (
                    <li key={rule}>
                      <Icon aria-hidden="true" />
                      {rule}
                    </li>
                  );
                })}
              </ul>
            </section>
          </div>

          {/* <aside className="booking-card">
            <div className="booking-price">
              <strong>$2,450</strong>
              <span>/night</span>
            </div>
            <div className="booking-discount">
              <span>$3200</span>
              <strong>24% OFF</strong>
            </div>
            <Form className="booking-form">
              <Form.Group controlId="buyerCheckIn">
                <Form.Label>Check-in</Form.Label>
                <Form.Control type="date" />
              </Form.Group>
              <Form.Group controlId="buyerCheckOut">
                <Form.Label>Check-out</Form.Label>
                <Form.Control type="date" />
              </Form.Group>
              <Form.Group controlId="buyerGuests">
                <Form.Label>Guests</Form.Label>
                <Form.Control type="number" min={1} />
              </Form.Group>
              <Button
                type="button"
                className="reserve-button"
                onClick={() => onNavigate?.("/")}
              >
                Reserve Now
              </Button>
            </Form>
            <div className="booking-total">
              <span>$2,450 x 3 nights</span>
              <strong>$7,350</strong>
              <span>Service fee</span>
              <strong>$147</strong>
              <span>Total</span>
              <strong>$7,497</strong>
            </div>
          </aside> */}
        </div>

        <section className="listing-info-card amenities-card-wide">
          <h2>Amenities</h2>
          <div className="amenity-grid">
            {listingAmenities.map(({ label, Icon }) => (
              <span key={label}>
                {Icon === CheckCircle2 ? (
                  <Pin aria-hidden="true" />
                ) : (
                  <Icon aria-hidden="true" />
                )}
                {label}
              </span>
            ))}
          </div>
        </section>
      </Container>
    </main>
  );
}

export default IndividualListing;
