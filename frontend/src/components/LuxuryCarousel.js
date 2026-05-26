import React, { useState } from "react";

const properties = [
  {
    id: 1,
    tag: "Total Privacy",
    title: "Private Estates",
    description:
      "We curate secluded retreats designed for total privacy and refined comfort.",
    image:
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85",
  },

  {
    id: 2,
    tag: "Metropolitan Suites",
    title: "Penthouses",
    description:
      "Experience the pinnacle of urban living with skyline views.",
    image:
      "https://images.unsplash.com/photo-1494526585095-c41746248156",
  },

  {
    id: 3,
    tag: "Mountain Retreats",
    title: "Resorts",
    description:
      "Escape into natural beauty with world-class luxury experiences.",
    image:
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb",
  },
];

const LuxuryCarousel = () => {
  const [active, setActive] = useState(0);

  return (
    <section className="luxury-carousel">
      <div className="top-layout">
        <div className="left-content">
          <button>About Us</button>

          <h1>
            Built for Every Luxury Environment
          </h1>

          <p>
            Deluxe Bookings was founded to redefine the digital hospitality
            landscape.
          </p>
        </div>

        <div className="carousel-container-card">
          {properties.map((property, index) => (
            <div
              key={property.id}
              className={`carousel-card-card ${
                active === index ? "active" : ""
              }`}
              onMouseEnter={() => setActive(index)}
            >
              <img src={property.image} alt="" />

              <div className="overlay">
                <span>{property.tag}</span>

                <h2>{property.title}</h2>

                <p>{property.description}</p>

                <button className="explore-btn-card">
                  Explore Estates

                  <div>↗</div>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bottom-layout">
        <h1>
          Explore Our Proudly South African Trending Collection
        </h1>

        <div className="bottom-right">
          <button>
            View more ↗
          </button>

          <p>
            Deluxe Bookings showcases a vision of contemporary hospitality.
          </p>
        </div>
      </div>
    </section>
  );
};

export default LuxuryCarousel;