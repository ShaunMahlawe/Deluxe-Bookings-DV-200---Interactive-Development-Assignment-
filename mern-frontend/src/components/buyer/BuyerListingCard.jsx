import { Badge, Button, Card, Col, Row, Stack } from "react-bootstrap";
import { Bath, BedDouble, Home, MapPin, Pencil, Trash2, Users } from "lucide-react";

const iconProps = {
  size: 20,
  strokeWidth: 2.4,
  className: "buyer-card-icon",
};

function BuyerListingCard({ listing, onEdit, onDelete }) {
  const displayLocation =
    listing.location ||
    [listing.city, listing.province, listing.country].filter(Boolean).join(", ") ||
    "Location not added";

  const image = listing.image || listing.images?.[0]?.preview || listing.images?.[0];
  const guests = listing.guestCapacity || listing.guests;
  const price = listing.pricePerNight ? Number(listing.pricePerNight).toLocaleString("en-ZA") : "Set price";

  return (
    <Card className="buyer-listing-card h-100">
      <Row className="g-0 h-100">
        <Col md={5} lg={4}>
          <div className="buyer-listing-media">
            {image ? (
              <img src={image} alt={listing.propertyName || listing.title || "Property"} />
            ) : (
              <div className="buyer-listing-placeholder">
                <span>Deluxe</span>
              </div>
            )}
            <Badge bg="dark" className="buyer-listing-status">
              {listing.status || (listing.isFullyBooked ? "Fully booked" : "Available")}
            </Badge>
          </div>
        </Col>

        <Col md={7} lg={8}>
          <Card.Body className="buyer-listing-body">
            <div>
              <Stack direction="horizontal" gap={2} className="flex-wrap mb-3">
                {listing.propertyType && (
                  <Badge bg="light" text="dark" className="buyer-soft-badge">
                    <Home {...iconProps} size={18} />
                    {listing.propertyType}
                  </Badge>
                )}
                {listing.dealType && (
                  <Badge bg="light" text="dark" className="buyer-soft-badge">
                    {listing.dealType}
                  </Badge>
                )}
              </Stack>

              <Card.Title as="h2" className="buyer-listing-title">
                {listing.title || listing.propertyName || "Untitled listing"}
              </Card.Title>

              <p className="buyer-listing-location">
                <MapPin {...iconProps} />
                {displayLocation}
              </p>
              <p className="buyer-listing-description">
                {listing.description || "Add a description to help guests understand the property experience."}
              </p>
            </div>

            <div className="buyer-listing-footer">
              <div className="buyer-listing-facts">
                {listing.bedrooms && (
                  <span>
                    <BedDouble {...iconProps} />
                    {listing.bedrooms} bedrooms
                  </span>
                )}
                {listing.bathrooms && (
                  <span>
                    <Bath {...iconProps} />
                    {listing.bathrooms} bathrooms
                  </span>
                )}
                {guests && (
                  <span>
                    <Users {...iconProps} />
                    {guests} guests
                  </span>
                )}
              </div>

              <div className="buyer-listing-actions">
                <div className="buyer-price">
                  <span>Nightly rate</span>
                  <strong>{price === "Set price" ? price : `ZAR ${price}`}</strong>
                </div>
                <div className="buyer-action-buttons">
                  <Button variant="outline-dark" size="sm" onClick={onEdit}>
                    <Pencil {...iconProps} size={18} />
                    Edit
                  </Button>
                  <Button variant="outline-dark" size="sm" className="buyer-delete-action" onClick={onDelete}>
                    <Trash2 {...iconProps} size={18} />
                    Delete
                  </Button>
                </div>
              </div>
            </div>
          </Card.Body>
        </Col>
      </Row>
    </Card>
  );
}

export default BuyerListingCard;
