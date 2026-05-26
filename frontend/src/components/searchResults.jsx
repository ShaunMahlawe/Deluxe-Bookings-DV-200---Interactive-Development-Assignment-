import React from 'react';
import { ArrowUpDown, ChevronRight, CircleCheck, CircleX, Info, MapPinned, Heart, Star } from 'lucide-react';
import FilterPanel from './filter';
import './searchResults.css';
import Footer from './footer';

import Carousel from './carousel';

const cards = [
  {
    id: 1,
    title: 'WEX1 2BR Ensuite Apartment with Pool, Gym & Parking',
    area: 'Woodstock, Cape Town',
    distance: '2.9 km from centre',
    beach: '150 m from beach',
    price: 'ZAR 1,157',
  },
  {
    id: 2,
    title: 'WEX1 2BR Ensuite Apartment with Pool, Gym & Parking',
    area: 'Woodstock, Cape Town',
    distance: '2.9 km from centre',
    beach: '150 m from beach',
    price: 'ZAR 1,157',
  },
  {
    id: 3,
    title: 'WEX1 2BR Ensuite Apartment with Pool, Gym & Parking',
    area: 'Woodstock, Cape Town',
    distance: '2.9 km from centre',
    beach: '150 m from beach',
    price: 'ZAR 1,157',
  },
  {
    id: 4,
    title: 'WEX1 2BR Ensuite Apartment with Pool, Gym & Parking',
    area: 'Woodstock, Cape Town',
    distance: '2.9 km from centre',
    beach: '150 m from beach',
    price: 'ZAR 1,157',
  },
  {
    id: 5,
    title: 'WEX1 2BR Ensuite Apartment with Pool, Gym & Parking',
    area: 'Woodstock, Cape Town',
    distance: '2.9 km from centre',
    beach: '150 m from beach',
    price: 'ZAR 1,157',
  },
  {
    id: 6,
    title: 'WEX1 2BR Ensuite Apartment with Pool, Gym & Parking',
    area: 'Woodstock, Cape Town',
    distance: '2.9 km from centre',
    beach: '150 m from beach',
    price: 'ZAR 1,157',
  },
  {
    id: 7,
    title: 'WEX1 2BR Ensuite Apartment with Pool, Gym & Parking',
    area: 'Woodstock, Cape Town',
    distance: '2.9 km from centre',
    beach: '150 m from beach',
    price: 'ZAR 1,157',
  },
  {
    id: 8,
    title: 'WEX1 2BR Ensuite Apartment with Pool, Gym & Parking',
    area: 'Woodstock, Cape Town',
    distance: '2.9 km from centre',
    beach: '150 m from beach',
    price: 'ZAR 1,157',
  },
  {
    id: 9,
    title: 'WEX1 2BR Ensuite Apartment with Pool, Gym & Parking',
    area: 'Woodstock, Cape Town',
    distance: '2.9 km from centre',
    beach: '150 m from beach',
    price: 'ZAR 1,157',
  },
  {
    id: 10,
    title: 'WEX1 2BR Ensuite Apartment with Pool, Gym & Parking',
    area: 'Woodstock, Cape Town',
    distance: '2.9 km from centre',
    beach: '150 m from beach',
    price: 'ZAR 1,157',
  },
  {
    id: 11,
    title: 'WEX1 2BR Ensuite Apartment with Pool, Gym & Parking',
    area: 'Woodstock, Cape Town',
    distance: '2.9 km from centre',
    beach: '150 m from beach',
    price: 'ZAR 1,157',
  },
  {
    id: 12,
    title: 'WEX1 2BR Ensuite Apartment with Pool, Gym & Parking',
    area: 'Woodstock, Cape Town',
    distance: '2.9 km from centre',
    beach: '150 m from beach',
    price: 'ZAR 1,157',
  },
  {
    id: 13,
    title: 'WEX1 2BR Ensuite Apartment with Pool, Gym & Parking',
    area: 'Woodstock, Cape Town',
    distance: '2.9 km from centre',
    beach: '150 m from beach',
    price: 'ZAR 1,157',
  },
  {
    id: 14,
    title: 'WEX1 2BR Ensuite Apartment with Pool, Gym & Parking',
    area: 'Woodstock, Cape Town',
    distance: '2.9 km from centre',
    beach: '150 m from beach',
    price: 'ZAR 1,157',
  },
  {
    id: 15,
    title: 'WEX1 2BR Ensuite Apartment with Pool, Gym & Parking',
    area: 'Woodstock, Cape Town',
    distance: '2.9 km from centre',
    beach: '150 m from beach',
    price: 'ZAR 1,157',
  },  
  {
    id: 16,
    title: 'WEX1 2BR Ensuite Apartment with Pool, Gym & Parking',
    area: 'Woodstock, Cape Town',
    distance: '2.9 km from centre',
    beach: '150 m from beach',
    price: 'ZAR 1,157',
  }, 
  {
    id: 17,
    title: 'WEX1 2BR Ensuite Apartment with Pool, Gym & Parking',
    area: 'Woodstock, Cape Town',
    distance: '2.9 km from centre',
    beach: '150 m from beach',
    price: 'ZAR 1,157',
  }, 
  {
    id: 18,
    title: 'WEX1 2BR Ensuite Apartment with Pool, Gym & Parking',
    area: 'Woodstock, Cape Town',
    distance: '2.9 km from centre',
    beach: '150 m from beach',
    price: 'ZAR 1,157',
  },  
];


const SearchResults = () => {
  const featuredCards = cards.slice(0, 3);
  const remainingCards = cards.slice(3);
  const breadcrumbItems = ['Home', 'South Africa', 'Western Cape', 'Cape Town', 'Search results'];

  return (
    <div className="results-page">
      <div className="results-content">
        <nav className="breadcrumbs" aria-label="Breadcrumb">
          {breadcrumbItems.map((item, index) => (
            <React.Fragment key={item}>
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
                title="Cape Town hotel results map"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                src="https://www.google.com/maps?q=hotels+in+cape+town&output=embed"
              />
              <a
                className="map-button"
                href="https://www.google.com/maps/search/hotels+in+cape+town"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span>Show on map</span>
                <span className="map-icon-wrap">
                  <MapPinned size={13} />
                </span>
              </a>
            </div>
            <FilterPanel />
          </aside>

          <section className="right-column">
            <h1>Cape Town: 7,703 properties found</h1>

            <button type="button" className="sort-button">
              <ArrowUpDown size={22} />
              <span>Sort by: Our top picks</span>
            </button>

            <div className="site-alert">
              <Info size={16} />
              <span>83% of places to stay are unavailable for your dates on our site.</span>
              <CircleX size={18} />
            </div>

            <div className="property-grid property-grid-featured">
              {featuredCards.map((card) => (
                <article className="property-card" key={card.id}>
                  <div className="property-image">
                    <button type="button" className="favourite-button" aria-label="Add to favourites">
                      <Heart size={22} />
                    </button>
                  </div>

                  <div className="property-body">
                    <h2>{card.title}</h2>
                    <div className="card-stars" aria-label="5 star rating">
                      {Array.from({ length: 5 }).map((_, index) => (
                        <Star key={`${card.id}-featured-star-${index}`} size={18} fill="currentColor" strokeWidth={1.8} />
                      ))}
                    </div>
                    <span className="card-tag">New to Deluxe Bookings</span>

                    <div className="score-row">
                      <span className="score-pill">8.2</span>
                      <span>Very good</span>
                      <span>611 reviews</span>
                    </div>

                    <p className="value-text">Value for money 8.4</p>
                    <div className="location-row">
                      <span>{card.area}</span>
                      <span>Show on map</span>
                    </div>

                    <div className="distance-row">
                      <span>{card.distance}</span>
                      <span>{card.beach}</span>
                    </div>

                    <span className="deal-chip">Getaway Deal</span>

                    <div className="rule-line" />

                    <p className="unit-type">Two-Bedroom Apartment</p>
                    <ul className="unit-list">
                      <li>Entire apartment 2 bedrooms 2 bathrooms 1 kitchen 99 m²</li>
                      <li>3 beds (2 singles, 1 large double)</li>
                    </ul>

                    <div className="cancel-row">
                      <CircleCheck size={18} />
                      <span>Free cancellation</span>
                    </div>

                    <div className="price-footer">
                      <span className="old-price">ZAR 1,429</span>
                      <span className="new-price">{card.price}</span>
                    </div>
                    <p className="tax-line">+ ZAR 480 taxes and charges</p>
                  </div>
                </article>
              ))}
            </div>

            <div className="property-grid property-grid-lower">
              {remainingCards.map((card) => (
                <article className="property-card" key={card.id}>
                  <div className="property-image">
                    <button type="button" className="favourite-button" aria-label="Add to favourites">
                      <Heart size={22} />
                    </button>
                  </div>

                  <div className="property-body">
                    <h2>{card.title}</h2>
                    <div className="card-stars" aria-label="5 star rating">
                      {Array.from({ length: 5 }).map((_, index) => (
                        <Star key={`${card.id}-lower-star-${index}`} size={18} fill="currentColor" strokeWidth={1.8} />
                      ))}
                    </div>
                    <span className="card-tag">New to Deluxe Bookings</span>

                    <div className="score-row">
                      <span className="score-pill">8.2</span>
                      <span>Very good</span>
                      <span>611 reviews</span>
                    </div>

                    <p className="value-text">Value for money 8.4</p>
                    <div className="location-row">
                      <span>{card.area}</span>
                      <span>Show on map</span>
                    </div>

                    <div className="distance-row">
                      <span>{card.distance}</span>
                      <span>{card.beach}</span>
                    </div>

                    <span className="deal-chip">Getaway Deal</span>

                    <div className="rule-line" />

                    <p className="unit-type">Two-Bedroom Apartment</p>
                    <ul className="unit-list">
                      <li>Entire apartment 2 bedrooms 2 bathrooms 1 kitchen 99 m²</li>
                      <li>3 beds (2 singles, 1 large double)</li>
                    </ul>

                    <div className="cancel-row">
                      <CircleCheck size={18} />
                      <span>Free cancellation</span>
                    </div>

                    <div className="price-footer">
                      <span className="old-price">ZAR 1,429</span>
                      <span className="new-price">{card.price}</span>
                    </div>
                    <p className="tax-line">+ ZAR 480 taxes and charges</p>
                  </div>
                </article>
              ))}
            </div>



          </section>
        </div>
      </div>
      <Carousel />
      <Footer />
    </div>
  );
};

export default SearchResults;
