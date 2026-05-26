import React from 'react';
import { ArrowUpDown, ChevronRight, CircleCheck, CircleX, Info, MapPinned, Heart, Star } from 'lucide-react';
import FilterPanel from './filter.jsx';
import './searchResults.css';
import Footer from './footer.jsx';
import Carousel from './carousel.jsx';

const defaultSearchData = {
  breadcrumbs: ['Home', 'South Africa', 'Western Cape', 'Cape Town', 'Search results'],
  heading: 'Cape Town: 7,703 properties found',
  sortLabel: 'Sort by: Our top picks',
  alertText: '83% of places to stay are unavailable for your dates on our site.',
  map: {
    label: 'Show on map',
    embedUrl: 'https://www.google.com/maps?q=hotels+in+cape+town&output=embed',
    searchUrl: 'https://www.google.com/maps/search/hotels+in+cape+town',
  },
  properties: Array.from({ length: 12 }).map((_, index) => ({
    id: index + 1,
    title: 'WEX1 2BR Ensuite Apartment with Pool, Gym and Parking',
    area: 'Woodstock, Cape Town',
    distanceLabel: '2.9 km from centre',
    beachLabel: '150 m from beach',
    oldPrice: 'ZAR 1,429',
    price: 'ZAR 1,157',
    reviewScore: 8.2,
    reviewSummary: 'Very good',
    reviewCount: 611,
    valueForMoney: 8.4,
    tag: 'New to Deluxe Bookings',
    dealTag: 'Getaway Deal',
    unitType: 'Two-Bedroom Apartment',
    unitDetails: ['Entire apartment 2 bedrooms 2 bathrooms 1 kitchen 99 m2', '3 beds (2 singles, 1 large double)'],
    freeCancellation: true,
    stars: 5,
  })),
};

const PropertyCard = ({ card, keyPrefix }) => (
  <article className="property-card" key={card.id}>
    <div className="property-image">
      <button type="button" className="favourite-button" aria-label="Add to favourites">
        <Heart size={22} />
      </button>
    </div>

    <div className="property-body">
      <h2>{card.title}</h2>
      <div className="card-stars" aria-label={`${card.stars || 5} star rating`}>
        {Array.from({ length: card.stars || 5 }).map((_, index) => (
          <Star key={`${keyPrefix}-star-${card.id}-${index}`} size={18} fill="currentColor" strokeWidth={1.8} />
        ))}
      </div>
      <span className="card-tag">{card.tag || 'New to Deluxe Bookings'}</span>

      <div className="score-row">
        <span className="score-pill">{card.reviewScore || 8.2}</span>
        <span>{card.reviewSummary || 'Very good'}</span>
        <span>{card.reviewCount || 0} reviews</span>
      </div>

      <p className="value-text">Value for money {card.valueForMoney || 8.4}</p>
      <div className="location-row">
        <span>{card.area}</span>
        <span className="show-on-map-text">Show on map</span>
      </div>

      <div className="distance-row">
        <span>{card.distanceLabel}</span>
        <span>{card.beachLabel}</span>
      </div>

      <span className="deal-chip">{card.dealTag || 'Getaway Deal'}</span>

      <div className="rule-line" />

      <p className="unit-type">{card.unitType || 'Two-Bedroom Apartment'}</p>
      <ul className="unit-list">
        {(card.unitDetails || []).map((item) => (
          <li key={`${card.id}-${item}`}>{item}</li>
        ))}
      </ul>

      {card.freeCancellation ? (
        <div className="cancel-row">
          <CircleCheck size={18} />
          <span>Free cancellation</span>
        </div>
      ) : null}

      <div className="price-footer">
        <span className="old-price">{card.oldPrice || 'ZAR 1,429'}</span>
        <span className="new-price">{card.price}</span>
      </div>
      <p className="tax-line">+ ZAR 480 taxes and charges</p>
    </div>
  </article>
);

const SearchResults = ({ searchData, filterData, thingsToDoData, footerData }) => {
  const content = searchData || defaultSearchData;
  const cards = content.properties?.length ? content.properties : defaultSearchData.properties;
  const featuredCards = cards.slice(0, 3);
  const remainingCards = cards.slice(3);
  const breadcrumbItems = content.breadcrumbs || defaultSearchData.breadcrumbs;

  return (
    <div className="results-page">
      <div className="results-content">
        <nav className="breadcrumbs" aria-label="Breadcrumb">
          {breadcrumbItems.map((item, index) => (
            <React.Fragment key={`${item}-${index}`}>
              <span>{item}</span>
              {index < breadcrumbItems.length - 1 ? <ChevronRight size={14} aria-hidden="true" /> : null}
            </React.Fragment>
          ))}
        </nav>

        <div className="results-layout">
          <aside className="left-column">
            <div className="map-card">
              <iframe
                className="map-surface"
                title="South Africa hospitality map"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                src={content.map?.embedUrl || defaultSearchData.map.embedUrl}
              />
              <a
                className="map-button"
                href={content.map?.searchUrl || defaultSearchData.map.searchUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                <span>{content.map?.label || defaultSearchData.map.label}</span>
                <span className="map-icon-wrap">
                  <MapPinned size={13} />
                </span>
              </a>
            </div>
            <FilterPanel data={filterData} />
          </aside>

          <section className="right-column">
            <h1>{content.heading || defaultSearchData.heading}</h1>

            <button type="button" className="sort-button">
              <ArrowUpDown size={22} />
              <span>{content.sortLabel || defaultSearchData.sortLabel}</span>
            </button>

            <div className="site-alert">
              <Info size={16} />
              <span>{content.alertText || defaultSearchData.alertText}</span>
              <CircleX size={18} />
            </div>

            <div className="property-grid property-grid-featured">
              {featuredCards.map((card) => (
                <PropertyCard card={card} keyPrefix="featured" key={`featured-${card.id}`} />
              ))}
            </div>

            <div className="property-grid property-grid-lower">
              {remainingCards.map((card) => (
                <PropertyCard card={card} keyPrefix="lower" key={`lower-${card.id}`} />
              ))}
            </div>
          </section>
        </div>
      </div>
      <Carousel data={thingsToDoData} />
      <Footer data={footerData} />
    </div>
  );
};

export default SearchResults;
