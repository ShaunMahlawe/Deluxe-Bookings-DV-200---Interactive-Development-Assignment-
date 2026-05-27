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

const propertyImageById = {
  1: 'https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=1400&q=80',
  2: 'https://images.unsplash.com/photo-1570129477492-45c003edd2be?auto=format&fit=crop&w=1400&q=80',
  3: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1400&q=80',
  4: 'https://images.unsplash.com/photo-1468824357306-a439d58ccb1c?auto=format&fit=crop&w=1400&q=80',
  5: 'https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?auto=format&fit=crop&w=1400&q=80',
  6: 'https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=1400&q=80',
  7: 'https://images.unsplash.com/photo-1519823551278-64ac92734fb1?auto=format&fit=crop&w=1400&q=80',
  8: 'https://images.unsplash.com/photo-1480074568708-e7b720bb3f09?auto=format&fit=crop&w=1400&q=80',
  9: 'https://images.unsplash.com/photo-1505692952047-1a78307da8f2?auto=format&fit=crop&w=1400&q=80',
  10: 'https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&w=1400&q=80',
  11: 'https://images.unsplash.com/photo-1445019980597-93fa8acb246c?auto=format&fit=crop&w=1400&q=80',
  12: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1400&q=80',
};

const propertyImageByKeyword = [
  {
    keywords: ['wex1', 'woodstock'],
    imageUrl: 'https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=1400&q=80',
  },
  {
    keywords: ['bantry', 'atlantic'],
    imageUrl: 'https://images.unsplash.com/photo-1468824357306-a439d58ccb1c?auto=format&fit=crop&w=1400&q=80',
  },
  {
    keywords: ['umhlanga', 'dunes'],
    imageUrl: 'https://images.unsplash.com/photo-1570129477492-45c003edd2be?auto=format&fit=crop&w=1400&q=80',
  },
  {
    keywords: ['sandton', 'skyline', 'johannesburg'],
    imageUrl: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1400&q=80',
  },
  {
    keywords: ['kruger', 'lodge', 'skukuza'],
    imageUrl: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1400&q=80',
  },
  {
    keywords: ['franschhoek', 'vineyard', 'manor'],
    imageUrl: 'https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?auto=format&fit=crop&w=1400&q=80',
  },
  {
    keywords: ['boardwalk', 'gqeberha', 'summerstrand'],
    imageUrl: 'https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=1400&q=80',
  },
  {
    keywords: ['knysna', 'lagoon', 'heads'],
    imageUrl: 'https://images.unsplash.com/photo-1480074568708-e7b720bb3f09?auto=format&fit=crop&w=1400&q=80',
  },
  {
    keywords: ['pretoria', 'jacaranda', 'brooklyn'],
    imageUrl: 'https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&w=1400&q=80',
  },
  {
    keywords: ['stellenbosch', 'art house', 'winelands'],
    imageUrl: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1400&q=80',
  },
  {
    keywords: ['durban point', 'harbour'],
    imageUrl: 'https://images.unsplash.com/photo-1505692952047-1a78307da8f2?auto=format&fit=crop&w=1400&q=80',
  },
  {
    keywords: ['drakensberg', 'mountain', 'retreat'],
    imageUrl: 'https://images.unsplash.com/photo-1445019980597-93fa8acb246c?auto=format&fit=crop&w=1400&q=80',
  },
];

const fallbackPropertyImage =
  'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1400&q=80';

function resolvePropertyImage(card) {
  if (card.imageUrl) {
    return card.imageUrl;
  }

  const lookupText = `${card.title || ''} ${card.area || ''}`.toLowerCase();
  const keywordMatch = propertyImageByKeyword.find(({ keywords }) =>
    keywords.some((keyword) => lookupText.includes(keyword))
  );

  if (keywordMatch) {
    return keywordMatch.imageUrl;
  }

  return propertyImageById[card.id] || fallbackPropertyImage;
}

const PropertyCard = ({ card, keyPrefix }) => (
  <article className="property-card" key={card.id}>
    <div className="property-image" style={{ backgroundImage: `url(${resolvePropertyImage(card)})` }}>
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
