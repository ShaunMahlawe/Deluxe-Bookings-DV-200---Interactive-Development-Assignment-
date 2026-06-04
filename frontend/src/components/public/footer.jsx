import FooterImage from "../../assets/images/FooterImage.png"
import Logo from "../../assets/images/Logo.png"
import { /* BrowserRouter, Routes, Route,*/ Link } from "react-router-dom";
import "./Footer.css";

function Footer() {
  return (
    <footer className="footer">
        {/* SOFT REMOVE: old Bootstrap row footer classes are no longer active; footer now follows the shared design system. */}
        <div className="footer-inner">
            <div className="footer-top">
                <div className="footer-text">
                    <h2>Engage with Us in Conversation</h2>
                    <p>In a global world based on communication, a premium hospitality brand must look beyond its borders, open up to new experiences, and dare to be different. Meeting the brightest minds of one's time is the most effective way to nurture creativity and trust.</p>
                </div>

                <img src={FooterImage} alt="House with swimming pool" className="footer-image"/>
            </div>

            <div className="footer-bottom">
                <div className="footer-links">
                    <section className="footer-column" aria-labelledby="footer-about-heading">
                        <h4 id="footer-about-heading">About Us</h4>
                        <ul>
                            <li>Our Story</li>
                            <li>Vetting Process</li>
                            <li>Sustainability</li>
                            <li>Careers</li>
                            <li>Contact</li>
                        </ul>
                    </section>

                    <section className="footer-column" aria-labelledby="footer-service-heading">
                        <h4 id="footer-service-heading">Customer Service</h4>
                        <ul>
                            <li>Prices and Payments</li>
                            <li>Booking Policy</li>
                            <li>Return & Cancellation</li>
                            <li>Terms of Service</li>
                            <li>Privacy Policy</li>
                        </ul>
                    </section>

                    <section className="footer-column" aria-labelledby="footer-social-heading">
                        <h4 id="footer-social-heading">Social Media</h4>
                        <ul>
                            <li>Instagram</li>
                            <li>Facebook</li>
                            <li>LinkedIn</li>
                            <li>X (Twitter)</li>
                        </ul>
                    </section>
                </div>

                <Link to="/" className="footer-logo" aria-label="Deluxe Bookings home">
                    <img src={Logo} alt="Deluxe Bookings logo" />
                </Link>
            </div>
        </div>
    </footer>
  )
}

export default Footer;
