import { Bath, BedDouble, MapPin, MoreVertical, Users } from "lucide-react";
import { Dropdown } from "react-bootstrap";
import "../../css/SellerListingCard.css";

function getStatusClass(status = "") {
  return status.toLowerCase().replaceAll("_", "-").replaceAll(" ", "-");
}

function getStatusLabel(status = "") {
  const labels = {
    submitted_for_review: "In review",
    in_review: "In review",
    approved_unpublished: "Approved",
    removed_from_public: "Unpublished",
    unpublished: "Unpublished",
    published: "Published",
    draft: "Draft",
  };

  return labels[status] || "Unpublished";
}

function SellerListingCard({
  listing,
  onEdit,
  onStatusChange,
  onViewDetails,
}) {
  const image =
    listing.image ||
    listing.images?.[0] ||
    "https://placehold.co/400x300?text=No+Image";

  const location =
    listing.location ||
    [listing.city, listing.province]
      .filter(Boolean)
      .join(", ");

  const displayLocation = location
    .split(",")
    .map((part) => part.trim())
    .filter(
      (part) =>
        part &&
        part.toLowerCase() !== listing.country?.toLowerCase() &&
        part.toLowerCase() !== "south africa",
    )
    .join(", ");

  const getVisibilityAction = () => {
    if (listing.status === "published") {
      return {
        label: "Unpublish",
        variant: "danger",
      };
    }

    if (listing.status === "approved_unpublished") {
      return {
        label: "Publish",
        variant: "primary",
      };
    }

    if (listing.status === "unpublished") {
      return {
        label: "Resubmit",
        variant: "primary",
      };
    }

    if (
      listing.status === "submitted_for_review" ||
      listing.status === "in_review"
    ) {
      return {
        label: "Cancel Submission",
        variant: "danger",
      };
    }

    return null;
  };

  const visibilityAction = getVisibilityAction();

  return (
    <article className="seller-listing-card">
      <div className="seller-listing-card-image-wrapper">
        <img
          src={image}
          alt={listing.propertyName || "Listing"}
          className="seller-listing-card-image"
        />
      </div>

      <div className="seller-listing-card-main">
        <div className="seller-listing-card-sidebar">
          <span
            className={`seller-listing-status ${getStatusClass(listing.status)}`}
          >
            {getStatusLabel(listing.status)}
          </span>

          <div className="seller-listing-price">
            <span>Price</span>
            <strong>R{listing.pricePerNight}</strong>
            <small>per night</small>
          </div>
        </div>

        <div className="seller-listing-card-content">
          <div className="seller-listing-card-header">
            <span className="seller-listing-card-type">
              {listing.propertyType}
            </span>

            <h3>{listing.propertyName}</h3>
          </div>

          <p className="seller-listing-location">
            <MapPin aria-hidden="true" size={18} strokeWidth={2} />
            <span>{displayLocation}</span>
          </p>

          <p className="seller-listing-description">{listing.description}</p>

          <div className="seller-listing-details">
            <span>
              <Users aria-hidden="true" size={18} strokeWidth={2} />
              {listing.guestCapacity} Guests
            </span>
            <span>
              <BedDouble aria-hidden="true" size={18} strokeWidth={2} />
              {listing.bedrooms} Bedrooms
            </span>
            <span>
              <Bath aria-hidden="true" size={18} strokeWidth={2} />
              {listing.bathrooms} Bathrooms
            </span>
          </div>

          <div className="seller-listing-facilities">
            {listing.facilities?.slice(0, 4).map((facility) => (
              <span key={facility}>{facility}</span>
            ))}
          </div>
        </div>

        <div className="seller-listing-actions">
          <button
            type="button"
            className="seller-listing-action-secondary"
            onClick={onViewDetails}
          >
            View Details
          </button>

          <div className="seller-listing-desktop-actions">
            <button type="button" onClick={() => onEdit(listing._id)}>
              Edit
            </button>

            {visibilityAction && (
              <button
                type="button"
                className={
                  visibilityAction.variant === "danger"
                    ? "danger"
                    : "seller-listing-action-primary"
                }
                onClick={() => onStatusChange(listing._id, listing.status)}
              >
                {visibilityAction.label}
              </button>
            )}

          </div>

          <Dropdown align="end" className="seller-listing-action-menu">
            <Dropdown.Toggle
              className="seller-listing-action-menu-toggle"
              id={`seller-listing-actions-${listing._id}`}
              variant="light"
            >
              <MoreVertical aria-hidden="true" size={20} strokeWidth={2} />
              <span className="visually-hidden">Listing actions</span>
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item onClick={() => onEdit(listing._id)}>
                Edit
              </Dropdown.Item>

              {visibilityAction && (
                <Dropdown.Item
                  className={
                    visibilityAction.variant === "danger" ? "danger" : ""
                  }
                  onClick={() => onStatusChange(listing._id, listing.status)}
                >
                  {visibilityAction.label}
                </Dropdown.Item>
              )}

            </Dropdown.Menu>
          </Dropdown>
        </div>
      </div>
    </article>
  );
}

export default SellerListingCard;
