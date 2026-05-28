import { Container, Row, Col, Card, Button, Accordion, Badge } from "react-bootstrap";
import "../../css/SellerOnboarding.css";

function SellerOnboarding({ onNavigate }) {
  const benefits = [
    ["Premium Positioning", "Your property is presented as part of a curated luxury accommodation collection."],
    ["Revenue Optimisation", "Clear pricing guidance helps you attract quality guests while protecting value."],
    ["Verified Guest Screening", "Guest information is reviewed before bookings are confirmed."],
    ["Professional Photography", "Show your property with strong visuals that build trust."],
    ["Dedicated Account Support", "Receive guidance throughout setup, review, and listing updates."],
    ["Marketing Exposure", "Your listing can be promoted across Deluxe booking touchpoints."],
  ];

  const steps = [
    ["01", "Create Your Listing", "Share property details, amenities, photos, and house rules.", "15 min"],
    ["02", "Verification & Photography", "We review your property and help prepare it for guests.", "2–3 days"],
    ["03", "Go Live & Start Earning", "Your listing goes live and becomes visible to travellers.", "Instant"],
  ];

  return (
    <main className="seller-onboarding-page">
      <section className="seller-hero">
        <Container>
          <Row className="justify-content-center">
            <Col lg={10} xl={9} className="text-center">
              <p className="seller-eyebrow">Deluxe Partner Programme</p>

              <h1>List Your Property With Distinction</h1>

              <p className="seller-hero-copy">
                Join South Africa’s luxury accommodation platform and connect
                with travellers searching for exceptional stays.
              </p>

              <div className="hero-actions">
                <Button
                  className="deluxe-btn-primary"
                  onClick={() => onNavigate("/seller/create-listing")}
                >
                  Start Listing Your Property
                </Button>

                <Button
                  variant="outline-light"
                  className="deluxe-btn-outline-light"
                  onClick={() => onNavigate("/seller/dashboard")}
                >
                  Go to Dashboard
                </Button>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      <section className="stats-strip">
        <Container>
          <Row className="g-4 text-center">
            <Col md={3} xs={6}>
              <h3>R425k</h3>
              <p>Average annual earnings</p>
            </Col>
            <Col md={3} xs={6}>
              <h3>94%</h3>
              <p>Average occupancy</p>
            </Col>
            <Col md={3} xs={6}>
              <h3>2.4M</h3>
              <p>Monthly site visitors</p>
            </Col>
            <Col md={3} xs={6}>
              <h3>&lt; 24h</h3>
              <p>Average first booking</p>
            </Col>
          </Row>
        </Container>
      </section>

      <section className="seller-section">
        <Container>
          <Row className="justify-content-center text-center">
            <Col lg={8}>
              <h2>Calculate Your Earning Potential</h2>

              <Card className="earnings-card">
                <Row className="g-4">
                  <Col md={6}>
                    <small>Estimated nights per month</small>
                    <strong>20 nights</strong>
                  </Col>
                  <Col md={6}>
                    <small>Nightly rate</small>
                    <strong>R5,000</strong>
                  </Col>
                </Row>

                <div className="earnings-summary">
                  <div>
                    <span>Monthly earnings</span>
                    <strong>R100,000</strong>
                  </div>
                  <div>
                    <span>Annual gross</span>
                    <strong>R1,100,000</strong>
                  </div>
                  <div>
                    <span>After commission</span>
                    <strong>R968,000</strong>
                  </div>
                </div>
              </Card>
            </Col>
          </Row>
        </Container>
      </section>

      <section className="seller-section muted-section">
        <Container>
          <div className="section-heading text-center">
            <h2>Why List With Deluxe</h2>
            <p>We provide everything you need to succeed as a premium accommodation host.</p>
          </div>

          <Row className="g-4">
            {benefits.map(([title, text]) => (
              <Col md={6} lg={4} key={title}>
                <Card className="benefit-card h-100">
                  <div className="benefit-icon">✦</div>
                  <h3>{title}</h3>
                  <p>{text}</p>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      <section className="seller-section">
        <Container>
          <div className="section-heading text-center">
            <h2>Getting Started is Simple</h2>
            <p>Three easy steps to start earning with your luxury property.</p>
          </div>

          <Row className="g-3 justify-content-center">
            <Col lg={10}>
              {steps.map(([number, title, text, time]) => (
                <Card className="step-card" key={number}>
                  <div className="step-number">{number}</div>
                  <div>
                    <h3>{title}</h3>
                    <p>{text}</p>
                  </div>
                  <Badge bg="light" text="dark" className="step-badge">
                    {time}
                  </Badge>
                </Card>
              ))}
            </Col>
          </Row>
        </Container>
      </section>

      <section className="seller-section muted-section">
        <Container>
          <div className="section-heading text-center">
            <h2>Trusted by South Africa’s Finest</h2>
          </div>

          <Row className="g-4 justify-content-center">
            {["Sarah van der Merwe", "James Naidoo", "Lisa Botha"].map((name) => (
              <Col md={4} key={name}>
                <Card className="testimonial-card h-100">
                  <p>
                    “Deluxe helped position our property beautifully and brought
                    us high-quality guests.”
                  </p>
                  <strong>{name}</strong>
                  <span>Luxury host partner</span>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      <section className="seller-section">
        <Container>
          <Row className="justify-content-center">
            <Col lg={8}>
              <div className="section-heading text-center">
                <h2>Common Questions</h2>
              </div>

              <Accordion flush className="seller-faq">
                <Accordion.Item eventKey="0">
                  <Accordion.Header>What commission does Deluxe charge?</Accordion.Header>
                  <Accordion.Body>
                    Commission depends on the property category and listing agreement.
                  </Accordion.Body>
                </Accordion.Item>

                <Accordion.Item eventKey="1">
                  <Accordion.Header>What support do I receive?</Accordion.Header>
                  <Accordion.Body>
                    You receive support with onboarding, listing setup, review, and property presentation.
                  </Accordion.Body>
                </Accordion.Item>

                <Accordion.Item eventKey="2">
                  <Accordion.Header>Can I control my calendar and pricing?</Accordion.Header>
                  <Accordion.Body>
                    Yes. Hosts can manage availability, pricing, and listing details.
                  </Accordion.Body>
                </Accordion.Item>
              </Accordion>
            </Col>
          </Row>
        </Container>
      </section>

      <section className="seller-final-cta text-center">
        <Container>
          <h2>Ready to Elevate Your Property?</h2>
          <p>Join South Africa’s most discerning property owners.</p>

          <div className="hero-actions">
            <Button
              className="deluxe-btn-primary light"
              onClick={() => onNavigate("/seller/create-listing")}
            >
              List Your Property Now
            </Button>

            <Button
              variant="outline-light"
              className="deluxe-btn-outline-light"
            >
              Schedule a Call
            </Button>
          </div>
        </Container>
      </section>
    </main>
  );
}

export default SellerOnboarding;