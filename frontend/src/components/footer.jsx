import React from 'react';
import './Footer.css';
import footerLogo from '../assets/img/Footer logo.svg';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-top">
        <div className="footer-text">
          <h2>Engage with Us in Conversation.</h2>
          <p>
            In a global world based on communication, a premium hospitality brand must look beyond its borders, open up to
            new experiences, and dare to be different. Meeting the brightest minds of one's time is the most effective way to
            nurture creativity and trust.
          </p>
        </div>
        <div
          className="footer-image"
          role="img"
          aria-label="Luxury villa with a pool"
        />
      </div>
        <div className="footer-bottom">
          <div className="footer-links">
            <div className="footer-column">
              <h4>About Us</h4>
              <ul>
                <li>Our Story</li>
                <li>Vetting Process</li>
                <li>Sustainability</li>
                <li>Careers</li>
                <li>Contact</li>
              </ul>
            </div>
            <div className="footer-column">
              <h4>Customer Service</h4>
              <ul>
                <li>Prices and Payments</li>
                <li>Booking Policy</li>
                <li>Return & Cancellation</li>
                <li>Terms of Service</li>
                <li>Privacy Policy</li>
              </ul>
            </div>
            <div className="footer-column">
              <h4>Social Media</h4>
              <ul>
                <li>Instagram</li>
                <li>Facebook</li>
                <li>LinkedIn</li>
                <li>X (Twitter)</li>
              </ul>
            </div>
        </div>
          <div className="footer-logo">
            <img src={footerLogo} alt="Deluxe Bookings" />
          </div>
      </div>
    </footer>
  );
};

export default Footer;