import './App.css';

import ReviewForm from "./components/ReviewForm";
import HotelCarousel from "./components/HotelCarousel";
import AboutSection from "./components/AboutSection";
import LuxurySection from "./components/LuxurySection";

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
    </div>
  );
}
    

export default App;
