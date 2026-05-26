import React from 'react';
import './Footer.css';
import footerLogo from '../assets/img/Footer logo.svg';

const defaultFooterData = {
  heading: 'Engage with Us in Conversation.',
  description:
    "In a global world based on communication, a premium hospitality brand must look beyond its borders, open up to new experiences, and dare to be different. Meeting the brightest minds of one's time is the most effective way to nurture creativity and trust.",
  imageAlt: 'Luxury villa with a pool',
  columns: [
    {
      title: 'About Us',
      items: ['Our Story', 'Vetting Process', 'Sustainability', 'Careers', 'Contact'],
    },
    {
      title: 'Customer Service',
      items: ['Prices and Payments', 'Booking Policy', 'Return and Cancellation', 'Terms of Service', 'Privacy Policy'],
    },
    {
      title: 'Social Media',
      items: ['Instagram', 'Facebook', 'LinkedIn', 'X (Twitter)'],
    },
  ],
};

const Footer = ({ data }) => {
  const content = data || defaultFooterData;

  return (
    <footer className="footer">
      <div className="footer-top">
        <div className="footer-text">
          <h2>{content.heading || defaultFooterData.heading}</h2>
          <p>{content.description || defaultFooterData.description}</p>
        </div>
        <div
          className="footer-image"
          role="img"
          aria-label={content.imageAlt || defaultFooterData.imageAlt}
        />
      </div>
        <div className="footer-bottom">
          <div className="footer-links">
            {(content.columns || defaultFooterData.columns).map((column) => (
              <div className="footer-column" key={column.title}>
                <h4>{column.title}</h4>
                <ul>
                  {(column.items || []).map((item) => (
                    <li key={`${column.title}-${item}`}>{item}</li>
                  ))}
                </ul>
              </div>
            ))}
        </div>
          <div className="footer-logo">
            <img src={footerLogo} alt="Deluxe Bookings" />
          </div>
      </div>
    </footer>
  );
};

export default Footer;