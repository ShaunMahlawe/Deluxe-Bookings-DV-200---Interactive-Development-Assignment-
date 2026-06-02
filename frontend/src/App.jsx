import './App.css';

import ReviewForm from "./components/ReviewForm";
import HotelCarousel from "./components/HotelCarousel";

function App() {
  return (
    <div className="App">
      <section className="review-section">
        <ReviewForm />
      </section>

      <section className="hotelcarousel-section">
        <HotelCarousel />
      </section>
    </div>
  );
}

export default App;
