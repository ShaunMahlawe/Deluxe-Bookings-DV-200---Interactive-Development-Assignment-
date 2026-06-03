import { Nav } from "react-bootstrap";
import HeroHeader from "../../components/common/heroheader";
import Footer from "../../components/common/footer";
import NavBar from "../../components/common/navbar";
import HotelCarousel from "../../components/common/HotelCarousel";
import AboutSection from "../../components/common/AboutSection";
import LuxurySection from "../../components/common/LuxurySection";
import LuxuryCarousel from "../../components/common/LuxuryCarousel";
import OffersSection from "../../components/common/OfferSection";

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
