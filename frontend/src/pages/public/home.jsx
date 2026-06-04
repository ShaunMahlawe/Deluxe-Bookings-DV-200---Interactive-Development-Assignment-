import { Nav } from "react-bootstrap";
import HeroHeader from "../../components/public/heroheader";
import Footer from "../../components/public/footer";
import NavBar from "../../components/public/navbar";
import HotelCarousel from "../../components/public/HotelCarousel";
import AboutSection from "../../components/public/AboutSection";
import LuxurySection from "../../components/public/LuxurySection";
import LuxuryCarousel from "../../components/public/LuxuryCarousel";
import OffersSection from "../../components/public/OfferSection";

function Home() {
  return (
    <div>
  <HeroHeader></HeroHeader>
  <HotelCarousel></HotelCarousel>
  <AboutSection></AboutSection>
  <LuxurySection></LuxurySection>
  <OffersSection></OffersSection>
  <LuxuryCarousel></LuxuryCarousel>
  <Footer></Footer>
  </div>
  )
}

export default Home;
