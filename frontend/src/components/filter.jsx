import React from 'react';
import { ChevronDown, CircleHelp, House } from 'lucide-react';
import './filter.css';

const OptionRow = ({ id, label, count }) => (
  <li className="filter-option">
    <label htmlFor={id} className="filter-option-main">
      <input type="checkbox" id={id} />
      <span>{label}</span>
    </label>
    <span className="filter-option-count">{count}</span>
  </li>
);

const FilterPanel = () => {
  const topPreviousFilters = [
    { id: 'guest-houses', label: 'Guest houses', count: 304 },
    { id: 'chalets', label: 'Chalets', count: 8 },
    { id: 'bed-and-breakfast', label: 'Bed and Breakfast', count: 48 },
    { id: 'holiday-homes', label: 'Holiday homes', count: 182 },
    { id: 'homestays', label: 'Homestays', count: 39 },
    { id: 'country-houses', label: 'Country houses', count: 1 },
    { id: 'apartments', label: 'Apartments', count: 2394 },
    { id: 'luxury-tents', label: 'Luxury tents', count: 1 },
  ];

  const propertyFilters = [
    { id: 'breakfast-included', label: 'Breakfast included', count: 2788 },
    { id: 'superb-9-legacy', label: 'Superb: 9+ / Exceptional: 10+', count: 1088 },
    { id: 'hotels', label: 'Hotels', count: 237 },
    { id: 'very-good-8-legacy', label: 'Very good: 8+ / Fabulou...', count: 1843 },
    { id: 'waterfront', label: 'Waterfront', count: 49 },
    { id: 'camps-bay', label: 'Camps bay', count: 180 },
    { id: 'parking', label: 'Parking', count: 2859 },
    { id: 'green-point', label: 'Green Point', count: 234 },
  ];

  const reviewScore = [
    { id: 'superb-9', label: 'Superb: 9+', count: 1088 },
    { id: 'very-good-8', label: 'Very good: 8+', count: 1843 },
    { id: 'good-7', label: 'Good: 7+', count: 2438 },
    { id: 'pleasant-6', label: 'Pleasant: 6+', count: 2886 },
  ];

  const secondPreviousFilters = [
    { id: 'entire-homes', label: 'Entire homes & apartments', count: 2783 },
    { id: 'apartments-bottom', label: 'Apartments', count: 2394 },
    { id: 'guest-houses-bottom', label: 'Guest houses', count: 304 },
    { id: 'hotels-bottom', label: 'Hotels', count: 237 },
    { id: 'holiday-homes-bottom', label: 'Holiday homes', count: 182 },
    { id: 'villas-bottom', label: 'Villas', count: 98 },
    { id: 'bed-and-breakfast-bottom', label: 'Bed and Breakfast', count: 48 },
    { id: 'homestays-bottom', label: 'Homestays', count: 39 },
    { id: 'hostels-bottom', label: 'Hostels', count: 22 },
    { id: 'lodges-bottom', label: 'Lodges', count: 18 },
    { id: 'chalets-bottom', label: 'Chalets', count: 8 },
    { id: 'resorts-bottom', label: 'Resorts', count: 2 },
    { id: 'boats-bottom', label: 'Boats', count: 2 },
    { id: 'country-houses-bottom', label: 'Country houses', count: 1 },
    { id: 'luxury-tents-bottom', label: 'Luxury tents', count: 1 },
  ];

  const travelGroup = [
    { id: 'pets', label: 'Pets allowed', count: 218 },
    { id: 'adults-only', label: 'Adults only', count: 159 },
    { id: 'large-group', label: 'Travel Proud: LGBTO+ friendly', count: 264 },
  ];

  const brands = [
    { id: 'villa-amarina', label: 'Villa Armarina', count: 25 },
    { id: 'totalstay', label: 'Totalstay', count: 14 },
    { id: 'newmark', label: 'Newmark Hotels, Reserves and Lodges', count: 8 },
    { id: 'trevparkworld', label: 'TrevPAR World Group', count: 8 },
    { id: 'protea', label: 'Protea Hotels by Marriott', count: 5 },
    { id: 'southern-sun', label: 'Southern Sun Hotels', count: 5 },
    { id: 'onomo', label: 'ONOMO HOTELS', count: 3 },
    { id: 'marriott', label: 'Marriott Hotels & Resorts', count: 3 },
    { id: 'capital', label: 'The Capital Hotel & Apartments', count: 2 },
    { id: 'first-group', label: 'First Group', count: 2 },
  ];

  const funThings = [
    { id: 'beach-fun', label: 'Beach', count: 521 },
    { id: 'golf-fun', label: 'Golf course (within 3 km)', count: 487 },
    { id: 'hiking-fun', label: 'Hiking', count: 434 },
    { id: 'fitness-fun', label: 'Fitness centre', count: 295 },
    { id: 'cycling-fun', label: 'Cycling', count: 276 },
  ];

  const rating = [
    { id: 'star-1', label: '1 star', count: 1 },
    { id: 'star-2', label: '2 stars', count: 52 },
    { id: 'star-3', label: '3 stars', count: 832 },
    { id: 'star-4', label: '4 stars', count: 1427 },
    { id: 'star-5', label: '5 stars', count: 85 },
  ];

  return (
    <div className="filter-container">
      <div className="filter-section">
        <h3>Filter by:</h3>
        <div className="filter-category previous-filters">
          <h4>Your previous filters</h4>
          <ul>
            {topPreviousFilters.map((item) => (
              <OptionRow key={item.id} {...item} />
            ))}
          </ul>
        </div>

        <div className="filter-category filter-divider budget-section">
          <h4>Your budget (per night)</h4>
          <p className="section-subtext">ZAR 300+ - ZAR 5,000+</p>
          <div className="budget-histogram" aria-hidden="true">
            {[9, 16, 28, 46, 70, 88, 74, 58, 42, 31, 24, 19, 15, 12, 10, 8, 7, 6, 5, 4].map((bar, index) => (
              <span key={`bar-${index}`} style={{ height: `${bar}%` }} />
            ))}
          </div>
          <div className="budget-slider" aria-hidden="true">
            <span className="budget-handle" />
            <span className="budget-handle" />
          </div>
        </div>

        <div className="filter-category filter-divider">
          <h4>Property filters</h4>
          <ul>
            {propertyFilters.map((item) => (
              <OptionRow key={item.id} {...item} />
            ))}
          </ul>
        </div>

        <div className="filter-category smart-filters filter-divider">
          <h4>Smart filters</h4>
          <p className="smart-caption">
            What are you looking for?
            <CircleHelp size={18} />
          </p>
          <div className="filter-search-box">
            <textarea
              placeholder="Example: I want a place with great reviews and free cancellation"
            />
          </div>
          <button type="button" className="filter-search-button">
            <span>Find properties</span>
            <span className="search-button-icon">
              <House size={12} />
            </span>
          </button>
        </div>

        <div className="filter-category filter-divider">
          <h4>Review score</h4>
          <ul>
            {reviewScore.map((item) => (
              <OptionRow key={item.id} {...item} />
            ))}
          </ul>
        </div>

        <div className="filter-category filter-divider">
          <h4>Beach access</h4>
          <ul>
            <OptionRow id="beach-access" label="Beach nearby" count={272} />
          </ul>
        </div>

        <div className="filter-category filter-divider">
          <h4>Your previous filters</h4>
          <ul>
            {secondPreviousFilters.map((item) => (
              <OptionRow key={item.id} {...item} />
            ))}
          </ul>
        </div>

        <div className="filter-category filter-divider small-control-section">
          <h4>Bedrooms and bathrooms</h4>
          <div className="stepper-row">
            <span>Bedrooms</span>
            <div className="stepper-control">
              <button type="button" aria-label="Decrease bedrooms">-</button>
              <span>0</span>
              <button type="button" aria-label="Increase bedrooms">+</button>
            </div>
          </div>
          <div className="stepper-row">
            <span>Bathrooms</span>
            <div className="stepper-control">
              <button type="button" aria-label="Decrease bathrooms">-</button>
              <span>0</span>
              <button type="button" aria-label="Increase bathrooms">+</button>
            </div>
          </div>
        </div>

        <div className="filter-category filter-divider">
          <h4>Highly rated features</h4>
          <p className="section-subtext">Based on guest reviews</p>
          <ul>
            <OptionRow id="very-good-breakfast" label="Very good breakfast" count={184} />
          </ul>
        </div>

        <div className="filter-category filter-divider">
          <h4>Travel group</h4>
          <ul>
            {travelGroup.map((item) => (
              <OptionRow key={item.id} {...item} />
            ))}
          </ul>
        </div>

        <div className="filter-category filter-divider">
          <h4>Brands</h4>
          <ul>
            {brands.map((item) => (
              <OptionRow key={item.id} {...item} />
            ))}
          </ul>
          <button type="button" className="show-all-button">
            <span>Show all 20</span>
            <span className="show-all-icon">
              <ChevronDown size={12} />
            </span>
          </button>
        </div>

        <div className="filter-category filter-divider">
          <h4>Fun things to do</h4>
          <ul>
            {funThings.map((item) => (
              <OptionRow key={item.id} {...item} />
            ))}
          </ul>
        </div>

        <div className="filter-category filter-divider">
          <h4>Certifications</h4>
          <ul>
            <OptionRow id="sustainability" label="Sustainability certification" count={11} />
          </ul>
        </div>

        <div className="filter-category filter-divider filter-footer-spacing">
          <h4>Property rating</h4>
          <p className="section-subtext">The (e.g.) star rating and review ratings</p>
          <ul>
            {rating.map((item) => (
              <OptionRow key={item.id} {...item} />
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default FilterPanel;