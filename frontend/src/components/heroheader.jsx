import React from 'react';
import { HousePlus } from 'lucide-react';
import Navbar from './navbar';
import './heroheader.css';

const HeroHeader = () => (
  <header className="hero-header">
    <div className="hero-bg" />
    <Navbar />
    <div className="hero-content">
      <h1 className="hero-title">Luxury Without<br />Compromise</h1>
      <div className="hero-sub">
        <p className="hero-sub-text">
          Showcase your property to the world's most discerning travellers. We don't just list hotels; we curate experiences for a global audience that values quality over quantity.
        </p>
        <button className="hero-cta">
          <span>Apply to Join</span>
          <span className="hero-cta-icon" aria-hidden="true">
            <HousePlus size={18} />
          </span>
        </button>
      </div>
    </div>
  </header>
);

export default HeroHeader;
