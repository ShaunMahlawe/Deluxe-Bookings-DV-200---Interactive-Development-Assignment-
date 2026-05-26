import React from 'react';
import { HousePlus } from 'lucide-react';
import Navbar from './navbar.jsx';
import './heroheader.css';

const defaultHeroData = {
  title: 'Luxury Without\nCompromise',
  subtitle:
    "Showcase your property to the world's most discerning travellers. We do not just list hotels; we curate experiences for a global audience that values quality over quantity.",
  ctaLabel: 'Apply to Join',
};

const HeroHeader = ({ heroData, navbarData }) => {
  const content = heroData || defaultHeroData;
  const titleLines = String(content.title || defaultHeroData.title).split('\n');

  return (
    <header className="hero-header">
      <div className="hero-bg" />
      <Navbar destinationSuggestions={navbarData?.destinationSuggestions} />
      <div className="hero-content">
        <h1 className="hero-title">
          {titleLines.map((line, index) => (
            <React.Fragment key={`${line}-${index}`}>
              {line}
              {index < titleLines.length - 1 ? <br /> : null}
            </React.Fragment>
          ))}
        </h1>
        <div className="hero-sub">
          <p className="hero-sub-text">{content.subtitle || defaultHeroData.subtitle}</p>
          <button className="hero-cta">
            <span>{content.ctaLabel || defaultHeroData.ctaLabel}</span>
            <span className="hero-cta-icon" aria-hidden="true">
              <HousePlus size={18} />
            </span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default HeroHeader;
