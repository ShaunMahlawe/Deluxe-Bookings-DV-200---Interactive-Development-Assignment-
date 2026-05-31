import { Button, Container, Form } from "react-bootstrap";
import { CheckCircle2, Coffee, Dumbbell, MapPin, Star, Tv, Waves, Wifi } from "lucide-react";
import heroImage from "../../assets/pexels-pixabay-210574.jpg";
import detailImageOne from "../../assets/pexels-ben-mack-6775268.jpg";
import detailImageTwo from "../../assets/pexels-ahmetcotur-19084169.jpg";
import detailImageThree from "../../assets/pexels-fotografiagmazg-27051764.jpg";
import detailImageFour from "../../assets/pexels-rdne-8293776.jpg";
import "../../css/IndividualListing.css";

const galleryImages = [detailImageOne, detailImageTwo, detailImageThree, detailImageFour];

const houseRules = [
  "No smoking",
  "No pets allowed",
  "No parties or events",
  "Check-in: 3:00 PM",
  "Check-out: 11:00 AM",
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

function IndividualListing({ onNavigate }) {
  return (
    <main className="individual-listing-page">
      <Container fluid="lg" className="individual-listing-shell">
        <section className="listing-hero-block">
          <span className="deal-pill">Best Deal of The Week</span>
          <h1>VAST 2BR Tranquil Apartment with Pool, Gym, & Parking</h1>
          <div className="listing-meta-row">
            <span><Star aria-hidden="true" /> 4.9 (143 reviews)</span>
            <span><MapPin aria-hidden="true" /> Bali, Indonesia</span>
          </div>
        </section>

        <section className="listing-gallery" aria-label="Property gallery">
          <img className="listing-gallery-main" src={heroImage} alt="Poolside apartment view" />
          <div className="listing-gallery-stack">
            {galleryImages.map((image, index) => (
              <img src={image} alt={`Property detail ${index + 1}`} key={image} />
            ))}
          </div>
        </section>

        <div className="listing-content-grid">
          <div className="listing-main-content">
            <section className="listing-info-card">
              <h2>Hosted by Seaside Stays</h2>
              <div className="listing-facts">
                <span>4 guests</span>
                <span>2 bedrooms</span>
                <span>2 bathrooms</span>
                <span>120m²</span>
              </div>
              <hr />
              <h3>About this place</h3>
              <p>
                Escape to this exquisite apartment that blends luxury and tranquility.
                Natural light, calm interiors, a pool, gym access, and dedicated parking
                make it ideal for a polished coastal stay.
              </p>
            </section>

            <section className="listing-info-card">
              <h2>House Rules</h2>
              <ul className="rule-list">
                {houseRules.map((rule) => (
                  <li key={rule}>
                    <CheckCircle2 aria-hidden="true" />
                    {rule}
                  </li>
                ))}
              </ul>
            </section>
          </div>

          <aside className="booking-card">
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
              <Button type="button" className="reserve-button" onClick={() => onNavigate?.("/")}>
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
          </aside>
        </div>

        <section className="listing-info-card amenities-card-wide">
          <h2>Amenities</h2>
          <div className="amenity-grid">
            {amenities.map(({ label, Icon }) => (
              <span key={label}>
                <Icon aria-hidden="true" />
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
