import React from "react";
import Image from "../../assets/Rectangle 82.png";


const OffersSection = () => {
  return (
    <section className="offers-section">
      
      {/* MAIN CONTENT BOX */}
      <div className="offers-container">

        {/* TOP TEXT */}
        <div className="offers-header">
          <h1>Offers: Strategic Value</h1>

          <p>
            Promotions, deals and special offers for you
          </p>
        </div>

        {/* OFFER CARD */}
        <div className="offer-card">

          {/* LEFT IMAGE */}
          <div className="offer-image">
            <img
              src={Image}
              alt=""
            />
          </div>

          {/* RIGHT CONTENT */}
          <div className="offer-content">

            {/* SMALL TEXT */}
            <span>
              Escape for less with our Seasonal Collections
            </span>

            {/* MAIN TITLE */}
            <h2>
              No catch. Just getaways.
            </h2>

            {/* DESCRIPTION */}
            <p>
              Experience luxury for less with at least 15% off
              select vetted stays across South Africa—just
              book and go.
            </p>

            {/* BUTTON */}
            <button className="deal-btn">

              Save with a Getaway Deal

              {/* ARROW BUTTON */}
              <div className="arrow-box">
                ↗
              </div>

            </button>

          </div>
        </div>
      </div>
    </section>
  );
};

export default OffersSection;
