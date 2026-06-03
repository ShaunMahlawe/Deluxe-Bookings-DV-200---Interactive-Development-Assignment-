import { Nav } from "react-bootstrap";
import HeroHeader from "../../components/common/heroheader";
import Footer from "../../components/common/footer";
import NavBar from "../../components/common/navbar";
import HotelCarousel from "../Components/HotelCarousel";
import AboutSection from "../Components/AboutSection";
import LuxurySection from "../Components/LuxurySection";
import LuxuryCarousel from "../Components/LuxuryCarousel";
import OffersSection from "../Components/OfferSection";

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
