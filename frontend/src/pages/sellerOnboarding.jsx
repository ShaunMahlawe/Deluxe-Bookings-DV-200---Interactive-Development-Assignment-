import { useState } from "react";
import { Accordion, Badge, Button, Card, Col, Container, Form, Row } from "react-bootstrap";

import {
  ArrowRight,
  Award,
  Camera,
  ChevronLeft,
  ChevronRight,
  CircleUserRound,
  Clock3,
  Headphones,
  Megaphone,
  MessageCircle,
  ShieldCheck,
  TrendingUp,
} from "lucide-react";
import "../css/SellerOnboarding.css";

const formatCurrency = (value) =>
  new Intl.NumberFormat("en-ZA", {
    style: "currency",
    currency: "ZAR",
    maximumFractionDigits: 0,
  })
    .format(value)
    .replace("ZAR", "R");

const benefits = [
  {
    title: "Premium Positioning",
    text: "Your property is presented to South Africa's most discerning luxury travellers seeking exceptional stays.",
    icon: Award,
    dark: true,
  },
  {
    title: "Revenue Optimization",
    text: "Dynamic pricing tools and market insights help you maximise earnings while maintaining occupancy.",
    icon: TrendingUp,
  },
  {
    title: "Verified Guest Screening",
    text: "Every booking is protected with identity verification, damage protection, and secure payments.",
    icon: ShieldCheck,
    dark: true,
  },
  {
    title: "Professional Photography",
    text: "Show your property with elevated imagery that builds trust with premium guests.",
    icon: Camera,
  },
  {
    title: "Dedicated Account Manager",
    text: "Personal support from a luxury hospitality specialist who understands your property's unique needs.",
    icon: Headphones,
    dark: true,
  },
  {
    title: "Marketing Exposure",
    text: "Featured placements, social media promotion, and partnerships with luxury travel publications.",
    icon: Megaphone,
  },
];

const steps = [
  ["01", "Create Your Listing", "Share your property details, amenities, and what makes it special.", "15 min"],
  ["02", "Verification & Photography", "We verify your property and schedule professional photography.", "3-5 days"],
  ["03", "Go Live & Start Earning", "Reach thousands of affluent travellers seeking luxury stays.", "Instant"],
];

const testimonials = [
  {
    quote:
      "Deluxe helped position our property beautifully and brought us high-quality guests who respected the space.",
    name: "Sarah van der Merwe",
    property: "Atlantic Seaboard Villa",
  },
  {
    quote:
      "The platform attracts exactly the clientele we want - respectful, appreciative of luxury, and willing to pay for quality.",
    name: "Lisa Botha",
    property: "Kruger Safari Lodge",
  },
  {
    quote:
      "Their onboarding support made the listing process feel considered, premium, and genuinely useful for our team.",
    name: "James Naidoo",
    property: "Franschhoek Garden Residence",
  },
];

const testimonialTrackItems = [
  testimonials[testimonials.length - 2],
  testimonials[testimonials.length - 1],
  ...testimonials,
  testimonials[0],
  testimonials[1],
];

function SellerOnboarding({ onNavigate }) {
  const [nightlyRate, setNightlyRate] = useState(5000);
  const [nightsPerMonth, setNightsPerMonth] = useState(20);
  const [testimonialIndex, setTestimonialIndex] = useState(2);
  const [isTestimonialTransitioning, setIsTestimonialTransitioning] = useState(true);

  const monthlyEarnings = nightlyRate * nightsPerMonth;
  const annualGross = monthlyEarnings * 11;
  const afterCommission = Math.round(annualGross * 0.88);
  const nightlyRateProgress = ((nightlyRate - 1000) / (15000 - 1000)) * 100;
  const nightsPerMonthProgress = ((nightsPerMonth - 1) / (30 - 1)) * 100;

  const showPreviousTestimonial = () => {
    setIsTestimonialTransitioning(true);
    setTestimonialIndex((current) => current - 1);
  };

  const showNextTestimonial = () => {
    setIsTestimonialTransitioning(true);
    setTestimonialIndex((current) => current + 1);
  };

  const handleTestimonialTransitionEnd = () => {
    if (testimonialIndex === 1) {
      setIsTestimonialTransitioning(false);
      setTestimonialIndex(testimonials.length + 1);
    }

    if (testimonialIndex === testimonials.length + 2) {
      setIsTestimonialTransitioning(false);
      setTestimonialIndex(2);
    }
  };

  return (
    <main className="seller-onboarding-page">
      <nav className="seller-nav" aria-label="Seller onboarding navigation">
        <Container className="seller-nav-inner">
          <button className="seller-logo" type="button" onClick={() => onNavigate("/")}>
            Deluxe
          </button>
          <div className="seller-nav-links">
            <button type="button" onClick={() => onNavigate("/")}>Home</button>
            <button type="button">Properties</button>
            <button type="button" onClick={() => onNavigate("/seller/dashboard")}>Dashboard</button>
            <button type="button" onClick={() => onNavigate("/seller/onboarding")}>List Property</button>
          </div>
          <div className="seller-nav-actions">
            <Button className="seller-nav-cta" onClick={() => onNavigate("/seller/create-listing")}>
              Get Started
            </Button>
            <button className="seller-profile-btn" type="button" aria-label="Open profile">
              <CircleUserRound size={22} strokeWidth={2.4} />
            </button>
          </div>
        </Container>
      </nav>

      <section className="seller-hero">
        <Container>
          <Row className="justify-content-center">
            <Col lg={10} xl={9} className="text-center">
              <p className="seller-eyebrow">Deluxe partner programme</p>

              <h1>
                List Your Property <span>with</span> <em>Distinction</em>
              </h1>

              <p className="seller-hero-copy">
                Join South Africa's most exclusive accommodation platform and
                connect your luxury property with affluent travellers seeking
                exceptional experiences.
              </p>

              <div className="hero-actions">
                <Button className="deluxe-btn-primary" onClick={() => onNavigate("/seller/create-listing")}>
                  Start Listing Your Property
                  <ArrowRight size={20} strokeWidth={2.4} />
                </Button>

                <Button variant="outline-light" className="deluxe-btn-outline-light">
                  <MessageCircle size={20} strokeWidth={2.4} />
                  Speak to a Specialist
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
              <small>Per luxury property</small>
            </Col>
            <Col md={3} xs={6}>
              <h3>94%</h3>
              <p>Average occupancy</p>
              <small>For premium listings</small>
            </Col>
            <Col md={3} xs={6}>
              <h3>2.4M</h3>
              <p>Monthly site visitors</p>
              <small>Affluent travellers</small>
            </Col>
            <Col md={3} xs={6}>
              <h3>&lt; 24h</h3>
              <p>Time to first booking</p>
              <small>Average for new listings</small>
            </Col>
          </Row>
        </Container>
      </section>

      <section className="seller-section earnings-section">
        <Container>
          <Row className="justify-content-center text-center">
            <Col lg={9}>
              <h2>
                Calculate Your <em>Earning Potential</em>
              </h2>
              <p className="section-subtitle">See how much you could earn with Deluxe Bookings</p>

              <div className="earnings-controls">
                <label>
                  <Form.Range
                    style={{ "--range-progress": `${nightlyRateProgress}%` }}
                    min="1000"
                    max="15000"
                    step="500"
                    value={nightlyRate}
                    onChange={(event) => setNightlyRate(Number(event.target.value))}
                    aria-label="Nightly rate"
                  />
                  <span className="slider-meta">
                    <span>Nightly Rate</span>
                    <strong>{formatCurrency(nightlyRate)}</strong>
                  </span>
                </label>

                <label>
                  <Form.Range
                    style={{ "--range-progress": `${nightsPerMonthProgress}%` }}
                    min="1"
                    max="30"
                    step="1"
                    value={nightsPerMonth}
                    onChange={(event) => setNightsPerMonth(Number(event.target.value))}
                    aria-label="Estimated nights per month"
                  />
                  <span className="slider-meta">
                    <span>Estimated nights per month</span>
                    <strong>{nightsPerMonth} nights</strong>
                  </span>
                </label>
              </div>

              <div className="earnings-summary">
                <div>
                  <strong>{formatCurrency(monthlyEarnings)}</strong>
                  <span>Monthly earnings</span>
                </div>
                <div>
                  <strong>{formatCurrency(annualGross)}</strong>
                  <span>Annual gross</span>
                </div>
                <div>
                  <strong>{formatCurrency(afterCommission)}</strong>
                  <span>After commission</span>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      <section className="seller-section benefits-section">
        <Container>
          <div className="section-heading text-center">
            <h2>
              <em>Why</em> List With Deluxe
            </h2>
            <p>We provide everything you need to succeed as a premium accommodation host</p>
          </div>

          <div className="benefit-mosaic">
            {benefits.map(({ title, text, icon: Icon, dark }) => (
              <Card className={`benefit-card ${dark ? "dark-card" : ""}`} key={title}>
                <div className="benefit-card-inner">
                  <div className="benefit-icon">
                    <Icon size={24} strokeWidth={2.4} />
                  </div>
                  <h3>{title}</h3>
                  <p>{text}</p>
                </div>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      <section className="seller-section steps-section">
        <Container>
          <div className="section-heading text-center">
            <h2>
              <em>Getting Started</em> is Simple
            </h2>
            <p>Three easy steps to start earning with your luxury property</p>
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
                    <Clock3 size={18} strokeWidth={2.4} />
                    {time}
                  </Badge>
                </Card>
              ))}
            </Col>
          </Row>
        </Container>
      </section>

      <section className="seller-section testimonial-section">
        <div className="testimonial-layout">
          <div className="testimonial-copy">
            <h2>
              <em>Trusted</em> by South Africa's Finest
            </h2>
            <p>Here's what our partners are saying about us</p>
            <div className="testimonial-controls">
              <button type="button" onClick={showPreviousTestimonial} aria-label="Previous testimonial">
                <ChevronLeft size={24} strokeWidth={2.4} />
              </button>
              <button type="button" onClick={showNextTestimonial} aria-label="Next testimonial">
                <ChevronRight size={24} strokeWidth={2.4} />
              </button>
            </div>
          </div>

          <div className="testimonial-carousel-area">
            <div className="quote-stage">
              <div className="testimonial-viewport">
                <div
                  className={`testimonial-track ${isTestimonialTransitioning ? "" : "no-transition"}`}
                  style={{ "--testimonial-index": testimonialIndex }}
                  onTransitionEnd={handleTestimonialTransitionEnd}
                >
                  {testimonialTrackItems.map(({ quote, name, property }, index) => (
                    <Card className="quote-card" key={`${name}-${index}`}>
                      <p>{quote}</p>
                      <strong>{name}</strong>
                      <span>{property}</span>
                    </Card>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="seller-section faq-section">
        <Container>
          <Row className="justify-content-center">
            <Col lg={9}>
              <div className="section-heading text-center">
                <h2>Frequently Asked Questions</h2>
              </div>

              <Accordion flush className="seller-faq">
                <Accordion.Item eventKey="0">
                  <Accordion.Header>What commission does Deluxe charge?</Accordion.Header>
                  <Accordion.Body>
                    Commission depends on your property category, location, and listing agreement. We confirm this clearly before your listing goes live.
                  </Accordion.Body>
                </Accordion.Item>

                <Accordion.Item eventKey="1">
                  <Accordion.Header>How do I receive payments?</Accordion.Header>
                  <Accordion.Body>
                    Guest payments are processed securely, then paid out to your selected account according to your host agreement.
                  </Accordion.Body>
                </Accordion.Item>

                <Accordion.Item eventKey="2">
                  <Accordion.Header>What support do I receive?</Accordion.Header>
                  <Accordion.Body>
                    You receive guidance with onboarding, listing setup, property presentation, verification, and guest-ready improvements.
                  </Accordion.Body>
                </Accordion.Item>

                <Accordion.Item eventKey="3">
                  <Accordion.Header>Can I control my calendar and pricing?</Accordion.Header>
                  <Accordion.Body>
                    Yes. Hosts can manage availability, pricing, rules, and listing details as their property schedule changes.
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
          <p>Join South Africa's most discerning property owners and start welcoming exceptional guests today.</p>

          <div className="hero-actions">
            <Button className="deluxe-btn-primary light" onClick={() => onNavigate("/seller/create-listing")}>
              Start Listing Your Property
              <ArrowRight size={20} strokeWidth={2.4} />
            </Button>

            <Button variant="outline-light" className="deluxe-btn-outline-light">
              <MessageCircle size={20} strokeWidth={2.4} />
              Speak to a Specialist
            </Button>
          </div>
        </Container>
      </section>
    </main>
  );
}

export default SellerOnboarding;
