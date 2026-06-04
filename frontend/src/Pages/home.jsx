// FLAGGED DEAD CODE: this duplicate page imports the old capitalized
// ../Components directory. The active route uses pages/public/home.jsx with
// lowercase components/public imports.
import HeroHeader from "../Components/heroheader";
import Footer from "../Components/footer";
import HotelCarousel from "../Components/HotelCarousel";
import AboutSection from "../Components/AboutSection";
import LuxurySection from "../Components/LuxurySection";
import LuxuryCarousel from "../Components/LuxuryCarousel";
import OffersSection from "../Components/OfferSection";



function Home() {
  return (
    <div>
      <HeroHeader />
      <HotelCarousel />
      <AboutSection />
      <LuxurySection />
      <OffersSection />
      <LuxuryCarousel />
      <Footer />
    </div>
  );
}

export default Home;
