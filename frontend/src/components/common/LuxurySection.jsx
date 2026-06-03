import React, { useEffect, useRef, useState } from "react";
import "./HomeSection.css";


const statsData = [
  {
    number: 1200,
    suffix: "+",
    label: "Vetted Stays",
  },
  {
    number: 45,
    suffix: "+",
    label: "Locations",
  },
  {
    number: 15000,
    suffix: "+",
    label: "Happy Guests",
  },
  {
    number: 1,
    suffix: "st+",
    label: "In Luxury Trust",
  },
];

const LuxurySection = () => {
  const [counts, setCounts] = useState([0, 0, 0, 0]);

  const sectionRef = useRef(null);

  const [started, setStarted] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];

        if (entry.isIntersecting && !started) {
          setStarted(true);

          statsData.forEach((stat, index) => {
            let start = 0;

            const duration = 2000;

            const increment = stat.number / (duration / 16);

            const counter = setInterval(() => {
              start += increment;

              if (start >= stat.number) {
                start = stat.number;

                clearInterval(counter);
              }

              setCounts((prev) => {
                const updated = [...prev];

                updated[index] = Math.floor(start);

                return updated;
              });
            }, 16);
          });
        }
      },
      {
        threshold: 0.4,
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, [started]);

  return (
    <section className="luxury-section" ref={sectionRef}>
      <div className="top-content">
        <div className="left-side">
          <img
            src="https://images.unsplash.com/photo-1506744038136-46273834b3fb"
            alt=""
          />

          <div className="floating-content">
            <button>Luxury Escapes</button>

            <h1>
              Modern <br />
              Minimalist Stays
            </h1>
          </div>
        </div>

        <div className="right-side">
          <div className="small-card brown-card">
            <button>Aesthetic</button>

            <p>
              Curated spaces where every detail tells a story of luxury.
            </p>

            <h2>
              Into a gallery of elegance.
            </h2>
          </div>

          <div className="image-card">
            <img
              src="https://images.unsplash.com/photo-1505693416388-ac5ce068fe85"
              alt=""
            />

            <div className="overlay">
              <button>Premier Collection</button>

              <h3>
                Indulge in the artistry of elite hospitality.
              </h3>

              <div className="arrow-btn">↗</div>
            </div>
          </div>
        </div>
      </div>

      <div className="stats-container">
        {statsData.map((stat, index) => (
          <div className="stat-box" key={index}>
            <h2>
              {counts[index].toLocaleString()}
              {stat.suffix}
            </h2>

            <p>{stat.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default LuxurySection;