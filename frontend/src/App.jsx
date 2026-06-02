import './App.css';

import ReviewForm from "./components/ReviewForm";
import HotelCarousel from "./components/HotelCarousel";
import AboutSection from "./components/AboutSection";
import LuxurySection from "./components/LuxurySection";
import OffersSection from "./components/OfferSection";
import LuxuryCarousel from "./components/LuxuryCarousel";

function App() {
  return (
    <div className="App">
      <section className="review-section">
        <ReviewForm />
      </section>

      <section className="hotelcarousel-section">
        <HotelCarousel />
      </section>

      <section className="about-section">
        <AboutSection />
      </section>

      <section className="luxury-section">
        <LuxurySection />
      </section>

      <section className="luxury-carousel-section">
        <LuxuryCarousel />
      </section>

      <section className="offers-section">
        <OffersSection />
      </section>
    </div>
  );
}
    

export default App;
