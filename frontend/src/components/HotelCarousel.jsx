import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";

import { motion } from "framer-motion";
import "./HomeSection.css";
import { FaHeart, FaChevronLeft, FaChevronRight } from "react-icons/fa";


import "swiper/css";
import "swiper/css/navigation";

const hotels = [
  {
    id: 1,
    title: "Sandton Skye Premium Suites & Penthouses",
    location: "Johannesburg, South Africa",
    price: "ZAR 2,574",
    rating: "8.2",
    reviews: "611 reviews",
    image:
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e",
  },
  {
    id: 2,
    title: "Luxury Ocean Apartments",
    location: "Cape Town, South Africa",
    price: "ZAR 3,200",
    rating: "8.5",
    reviews: "420 reviews",
    image:
      "https://images.unsplash.com/photo-1499793983690-e29da59ef1c2",
  },
  {
    id: 3,
    title: "Modern Penthouse Suites",
    location: "Durban, South Africa",
    price: "ZAR 1,980",
    rating: "8.0",
    reviews: "280 reviews",
    image:
      "https://images.unsplash.com/photo-1494526585095-c41746248156",
  },
  {
    id: 4,
    title: "Coastal Paradise Resort",
    location: "Cape Town, South Africa",
    price: "ZAR 4,100",
    rating: "8.3",
    reviews: "520 reviews",
    image:
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85",
  },
];

function HotelCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className="carousel-container-hero luxury-theme">
      <div className="hero-content">
  <span>Luxury Properties</span>

  <h1>
    Luxury Without
    <br />
    Compromise
  </h1>

  <p>
    Discover South Africa's finest luxury stays.
  </p>
</div>
      <Swiper
        modules={[Navigation]}
        spaceBetween={30}
        slidesPerView={3}
        centeredSlides={true}
        loop={true}
        navigation={{
          nextEl: ".next-btn-hero",
          prevEl: ".prev-btn-hero",
        }}
        onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
        breakpoints={{
          320: {
            slidesPerView: 1.2,
          },
          768: {
            slidesPerView: 2,
          },
          1024: {
            slidesPerView: 3,
          },
        }}
      >
        {hotels.map((hotel, index) => (
          <SwiperSlide key={hotel.id}>
        <motion.div
          animate={{
            scale: activeIndex === index ? 1 : 0.88,
            opacity: activeIndex === index ? 1 : 0.55,
          }}
          transition={{
            duration: 0.4,
          }}
          className="hotel-card-hero"
        >
          <div className="image-wrapper">
            <img src={hotel.image} alt={hotel.title} />

            <div className="overlay-hero"></div>

            <button className="heart-btn-hero">
              <FaHeart />
            </button>

            <div className="title-section">
              <h2>{hotel.title}</h2>
            </div>
          </div>

          <div className="hotel-info">
            <h4>{hotel.location}</h4>

            <div className="bottom-row">
              <div className="rating-box">
                <div className="rating-number">
                  {hotel.rating}
                </div>

                <div className="rating-text">
                  <span>Very good</span>
                  <p>{hotel.reviews}</p>
                </div>
              </div>

              <div className="price-box">
                <span>Starting from</span>
                <h3>{hotel.price}</h3>
              </div>
            </div>
          </div>
        </motion.div>
          </SwiperSlide>
        ))}
      </Swiper>

      <div className="nav-buttons-hero">
        <button className="prev-btn-hero">
          <FaChevronLeft />
        </button>

        <button className="next-btn-hero">
          <FaChevronRight />
        </button>
      </div>
    </div>
  );
}

export default HotelCarousel;