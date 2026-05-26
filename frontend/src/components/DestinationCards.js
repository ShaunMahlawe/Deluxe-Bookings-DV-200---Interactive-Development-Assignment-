import React, { useState } from "react";


const destinations = [
  {
    title: "Explore Cape Town",
    subtitle: "Coastal Sophistication",
    description:
      "A wide, sunset shot of a minimalist villa nestled between the Atlantic Ocean and the 12 Apostles mountains.",
    image:
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85",
  },

  {
    title: "Explore Franschhoek",
    subtitle: "Elegant Escape",
    description:
      "Luxury minimalist interiors with breathtaking vineyard views.",
    image:
      "https://images.unsplash.com/photo-1494526585095-c41746248156",
  },

  {
    title: "Explore Kruger",
    subtitle: "Nature Retreat",
    description:
      "Experience premium safari luxury surrounded by nature.",
    image:
      "https://images.unsplash.com/photo-1441974231531-c6227db76b6e",
  },

  {
    title: "Explore Johannesburg",
    subtitle: "Urban Comfort",
    description:
      "Luxury city living designed for modern travellers.",
    image:
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85",
  },

  {
    title: "Explore Umhlanga",
    subtitle: "Ocean View Suites",
    description:
      "Sophisticated apartments with panoramic sea views.",
    image:
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb",
  },

  {
    title: "Explore Plettenberg Bay",
    subtitle: "Coastal Bliss",
    description:
      "Relax in elegant beachfront spaces with luxury finishes.",
    image:
      "https://images.unsplash.com/photo-1494526585095-c41746248156",
  },
];

const DestinationCards = () => {
  const [activeCard, setActiveCard] = useState(0);

  return (
    <section className="destinations-section">
      <div className="cards-grid">
        {destinations.map((card, index) => (
          <div
            className={`card ${
              activeCard === index ? "active" : ""
            }`}
            key={index}
            style={{
              backgroundImage: `url(${card.image})`,
            }}
            onClick={() => setActiveCard(index)}
          >
            <div className="overlay"csdfsddf></div>

            <div className="content">
              <h2>{card.title}</h2>

              {activeCard === index && (
                <>
                  <h3>{card.subtitle}</h3>

                  <p>{card.descriptiion}</p>
                </>
              )}
            </div>

            <button className="arrow-btn">
              ↗
            </button>
          </div>
        ))}
      </div>
    </section>
  );
};

export default DestinationCards;