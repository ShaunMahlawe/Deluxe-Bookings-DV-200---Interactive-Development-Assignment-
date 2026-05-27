import React, { useEffect, useMemo, useState } from 'react';
import { ChevronDown, CircleHelp, House, Minus, Plus } from 'lucide-react';
import './filter.css';

const MIN_BUDGET_GAP = 100;
const LEGACY_TRAVEL_PROUD_ID = 'large-group';
const TRAVEL_PROUD_ID = 'travel-proud-lgbtq';

const OptionRow = ({ id, label, count, checked, onToggle, countOverride }) => {
  const normalizedLabel = String(label || '').replace(/LGBTO\+?/gi, 'LGBTQ+');

  return (
  <li className="filter-option">
    <label htmlFor={id} className="filter-option-main">
      <input type="checkbox" id={id} checked={checked} onChange={onToggle} />
      <span>{normalizedLabel}</span>
    </label>
    <span className="filter-option-count">{Number.isFinite(countOverride) ? countOverride : count}</span>
  </li>
  );
};

const defaultFilterData = {
  previousFiltersTop: [
    { id: 'entire-homes', label: 'Entire homes and apartments', count: 2783 },
    { id: 'apartments', label: 'Apartments', count: 2394 },
    { id: 'guest-houses', label: 'Guest houses', count: 304 },
    { id: 'hotels', label: 'Hotels', count: 237 },
    { id: 'holiday-homes', label: 'Holiday homes', count: 182 },
    { id: 'villas', label: 'Villas', count: 98 },
    { id: 'bed-and-breakfast', label: 'Bed and Breakfast', count: 48 },
    { id: 'homestays', label: 'Homestays', count: 39 },
    { id: 'hostels', label: 'Hostels', count: 12 },
    { id: 'lodges', label: 'Lodges', count: 18 },
    { id: 'chalets', label: 'Chalets', count: 8 },
    { id: 'resorts', label: 'Resorts', count: 14 },
    { id: 'boats', label: 'Boats', count: 6 },
    { id: 'country-houses', label: 'Country houses', count: 1 },
    { id: 'luxury-tents', label: 'Luxury tents', count: 1 },
  ],
  budget: {
    rangeLabel: 'ZAR 300+ - ZAR 5,000+',
    histogram: [9, 16, 28, 46, 70, 88, 74, 58, 42, 31, 24, 19, 15, 12, 10, 8, 7, 6, 5, 4],
  },
  propertyFilters: [
    { id: 'breakfast-included', label: 'Breakfast included', count: 2788 },
    { id: 'superb-9-legacy', label: 'Superb: 9+ / Exceptional: 10+', count: 1088 },
    { id: 'hotels', label: 'Hotels', count: 237 },
    { id: 'very-good-8-legacy', label: 'Very good: 8+ / Fabulou...', count: 1843 },
    { id: 'waterfront', label: 'Waterfront', count: 49 },
    { id: 'camps-bay', label: 'Camps bay', count: 180 },
    { id: 'parking', label: 'Parking', count: 2859 },
    { id: 'green-point', label: 'Green Point', count: 234 },
  ],
  reviewScore: [
    { id: 'superb-9', label: 'Superb: 9+', count: 1088 },
    { id: 'very-good-8', label: 'Very good: 8+', count: 1843 },
    { id: 'good-7', label: 'Good: 7+', count: 2438 },
    { id: 'pleasant-6', label: 'Pleasant: 6+', count: 2886 },
  ],
  beachAccess: [{ id: 'beach-access', label: 'Beach nearby', count: 272 }],
  previousFiltersBottom: [],
  bedroomsBathrooms: {
    bedrooms: 0,
    bathrooms: 0,
  },
  highlyRatedFeatures: [{ id: 'very-good-breakfast', label: 'Very good breakfast', count: 184 }],
  travelGroup: [
    { id: 'pets', label: 'Pets allowed', count: 218 },
    { id: 'adults-only', label: 'Adults only', count: 159 },
    { id: TRAVEL_PROUD_ID, label: 'Travel Proud: LGBTQ+ friendly', count: 264 },
  ],
  brands: [
    { id: 'curated-stays', label: 'Curated Stays Collection', count: 25 },
    { id: 'coastal-club', label: 'Coastal Club', count: 14 },
    { id: 'urban-signature', label: 'Urban Signature', count: 8 },
    { id: 'safari-private', label: 'Safari Private Lodges', count: 8 },
    { id: 'protea-marriott', label: 'Protea Hotels by Marriott', count: 5 },
  ],
  funThings: [
    { id: 'beach-fun', label: 'Beach', count: 521 },
    { id: 'golf-fun', label: 'Golf course (within 3 km)', count: 487 },
    { id: 'hiking-fun', label: 'Hiking', count: 434 },
    { id: 'fitness-fun', label: 'Fitness centre', count: 295 },
    { id: 'cycling-fun', label: 'Cycling', count: 276 },
  ],
  certifications: [{ id: 'sustainability', label: 'Sustainability certification', count: 11 }],
  propertyRating: [
    { id: 'star-1', label: '1 star', count: 1 },
    { id: 'star-2', label: '2 stars', count: 52 },
    { id: 'star-3', label: '3 stars', count: 832 },
    { id: 'star-4', label: '4 stars', count: 1427 },
    { id: 'star-5', label: '5 stars', count: 85 },
  ],
};

function toPriceStep(value) {
  return Math.round(Number(value || 0) / 100) * 100;
}

function formatCurrency(value) {
  return `ZAR ${Math.round(Number(value || 0)).toLocaleString()}`;
}

function normalizeTravelGroup(items) {
  return (Array.isArray(items) ? items : []).map((item) => {
    if (item?.id === LEGACY_TRAVEL_PROUD_ID) {
      return {
        ...item,
        id: TRAVEL_PROUD_ID,
        label: 'Travel Proud: LGBTQ+ friendly',
      };
    }

    return item;
  });
}

function normalizeBrands(items) {
  const source = Array.isArray(items) ? items : [];
  const deduped = new Map();

  source.forEach((item) => {
    const label = String(item?.label || item?.id || '').trim();
    if (!label) {
      return;
    }

    const id = String(item?.id || label)
      .trim()
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');

    if (!id) {
      return;
    }

    const current = deduped.get(id);
    const nextCount = Number(item?.count) || 0;

    if (!current) {
      deduped.set(id, {
        id,
        label,
        count: nextCount,
      });
      return;
    }

    deduped.set(id, {
      ...current,
      count: Math.max(Number(current.count) || 0, nextCount),
    });
  });

  return Array.from(deduped.values()).sort((a, b) => (Number(b.count) || 0) - (Number(a.count) || 0));
}

const FilterPanel = ({ data, priceBounds, onFiltersChange, optionCounts, budgetHistogram }) => {
  const filters = useMemo(() => {
    const source = data || defaultFilterData;
    return {
      ...source,
      travelGroup: normalizeTravelGroup(source.travelGroup),
      brands: normalizeBrands(source.brands),
    };
  }, [data]);
  const [selectedOptionIds, setSelectedOptionIds] = useState(() => new Set());
  const [bedrooms, setBedrooms] = useState(Number(filters.bedroomsBathrooms?.bedrooms) || 0);
  const [bathrooms, setBathrooms] = useState(Number(filters.bedroomsBathrooms?.bathrooms) || 0);
  const [smartInput, setSmartInput] = useState('');
  const [smartQuery, setSmartQuery] = useState('');
  const [activeBudgetThumb, setActiveBudgetThumb] = useState('');
  const [showAllBrands, setShowAllBrands] = useState(false);

  const allOptions = useMemo(
    () => [
      ...filters.previousFiltersTop,
      ...filters.propertyFilters,
      ...filters.reviewScore,
      ...filters.beachAccess,
      ...filters.previousFiltersBottom,
      ...filters.highlyRatedFeatures,
      ...filters.travelGroup,
      ...filters.brands,
      ...filters.funThings,
      ...filters.certifications,
      ...filters.propertyRating,
    ],
    [filters]
  );

  const optionLabelById = useMemo(() => {
    return allOptions.reduce((acc, option) => {
      acc[option.id] = option.label;
      return acc;
    }, {});
  }, [allOptions]);

  const budgetFloor = toPriceStep(priceBounds?.min || 300);
  const budgetCeil = Math.max(budgetFloor + MIN_BUDGET_GAP, toPriceStep(priceBounds?.max || 5000));

  const [budgetMin, setBudgetMin] = useState(budgetFloor);
  const [budgetMax, setBudgetMax] = useState(budgetCeil);

  useEffect(() => {
    setBudgetMin(budgetFloor);
    setBudgetMax(budgetCeil);
  }, [budgetFloor, budgetCeil]);

  useEffect(() => {
    if (typeof onFiltersChange !== 'function') {
      return;
    }

    const selectedOptions = Array.from(selectedOptionIds).map((id) => ({
      id,
      label: optionLabelById[id] || id,
    }));

    onFiltersChange({
      selectedOptions,
      bedrooms,
      bathrooms,
      budgetMin,
      budgetMax,
      smartQuery,
    });
  }, [selectedOptionIds, bedrooms, bathrooms, budgetMin, budgetMax, smartQuery, optionLabelById, onFiltersChange]);

  useEffect(() => {
    if (!activeBudgetThumb) {
      return;
    }

    const clearActiveThumb = () => setActiveBudgetThumb('');
    window.addEventListener('pointerup', clearActiveThumb);
    window.addEventListener('touchend', clearActiveThumb);

    return () => {
      window.removeEventListener('pointerup', clearActiveThumb);
      window.removeEventListener('touchend', clearActiveThumb);
    };
  }, [activeBudgetThumb]);

  const minPercent = ((budgetMin - budgetFloor) / Math.max(1, budgetCeil - budgetFloor)) * 100;
  const maxPercent = ((budgetMax - budgetFloor) / Math.max(1, budgetCeil - budgetFloor)) * 100;

  const toggleOption = (optionId) => {
    setSelectedOptionIds((current) => {
      const next = new Set(current);
      if (next.has(optionId)) {
        next.delete(optionId);
      } else {
        next.add(optionId);
      }
      return next;
    });
  };

  const handleMinBudget = (nextValue) => {
    const parsed = toPriceStep(nextValue);
    setBudgetMin(Math.min(parsed, budgetMax - MIN_BUDGET_GAP));
  };

  const handleMaxBudget = (nextValue) => {
    const parsed = toPriceStep(nextValue);
    setBudgetMax(Math.max(parsed, budgetMin + MIN_BUDGET_GAP));
  };

  const histogramBars = Array.isArray(budgetHistogram?.bins) && budgetHistogram.bins.length > 0
    ? budgetHistogram.bins
    : filters.budget.histogram.map((value, index) => ({
      index,
      count: Number(value) || 0,
      min: budgetFloor,
      max: budgetCeil,
    }));

  const maxHistogramCount = Math.max(...histogramBars.map((bar) => Number(bar.count) || 0), 1);

  const renderOptions = (items) => (
    <ul>
      {items.map((item) => (
        <OptionRow
          key={item.id}
          {...item}
          countOverride={optionCounts?.[item.id]}
          checked={selectedOptionIds.has(item.id)}
          onToggle={() => toggleOption(item.id)}
        />
      ))}
    </ul>
  );

  const visibleBrands = showAllBrands ? filters.brands : filters.brands.slice(0, 3);
  const accommodationTypes = useMemo(
    () => [...filters.previousFiltersTop, ...filters.previousFiltersBottom],
    [filters.previousFiltersTop, filters.previousFiltersBottom]
  );

  return (
    <div className="filter-container">
      <div className="filter-section">
        <h3>Filter by:</h3>
        <div className="filter-category previous-filters">
          <h4>Property type</h4>
          {renderOptions(accommodationTypes)}
        </div>

        <div className="filter-category filter-divider budget-section">
          <h4>Your budget (per night)</h4>
          <p className="section-subtext">{`${formatCurrency(budgetMin)} - ${formatCurrency(budgetMax)}`}</p>
          <div className="budget-histogram" aria-hidden="true" role="presentation">
            {histogramBars.map((bar, index) => {
              const rawCount = Number(bar.count) || 0;
              const heightPercent = Math.max(8, Math.round((rawCount / maxHistogramCount) * 100));
              const barMin = Number(bar.min) || budgetFloor;
              const barMax = Number(bar.max) || budgetCeil;
              const midpoint = (barMin + barMax) / 2;
              const inRange = midpoint >= budgetMin && midpoint <= budgetMax;

              return (
                <span
                  key={`bar-${index}`}
                  className={inRange ? 'in-range' : ''}
                  style={{ height: `${heightPercent}%` }}
                />
              );
            })}
          </div>

          <div className="budget-slider-modern" aria-label="Set budget range">
            <div className="budget-slider-rail" />
            <div
              className="budget-slider-fill"
              style={{
                left: `${minPercent}%`,
                right: `${100 - maxPercent}%`,
              }}
            />

            <input
              className="budget-range budget-range-min"
              type="range"
              min={budgetFloor}
              max={budgetCeil}
              step={100}
              value={budgetMin}
              onChange={(event) => handleMinBudget(event.target.value)}
              onPointerDown={() => setActiveBudgetThumb('min')}
              onFocus={() => setActiveBudgetThumb('min')}
              onBlur={() => setActiveBudgetThumb('')}
              aria-label="Minimum price per night"
            />
            <input
              className="budget-range budget-range-max"
              type="range"
              min={budgetFloor}
              max={budgetCeil}
              step={100}
              value={budgetMax}
              onChange={(event) => handleMaxBudget(event.target.value)}
              onPointerDown={() => setActiveBudgetThumb('max')}
              onFocus={() => setActiveBudgetThumb('max')}
              onBlur={() => setActiveBudgetThumb('')}
              aria-label="Maximum price per night"
            />

            <div
              className={`budget-bubble budget-bubble-min ${activeBudgetThumb === 'min' ? 'visible' : ''}`}
              style={{ left: `${minPercent}%` }}
            >
              {formatCurrency(budgetMin)}
            </div>
            <div
              className={`budget-bubble budget-bubble-max ${activeBudgetThumb === 'max' ? 'visible' : ''}`}
              style={{ left: `${maxPercent}%` }}
            >
              {formatCurrency(budgetMax)}
            </div>
          </div>
        </div>

        <div className="filter-category filter-divider">
          <h4>Property filters</h4>
          {renderOptions(filters.propertyFilters)}
        </div>

        <div className="filter-category smart-filters filter-divider">
          <h4>Smart filters</h4>
          <p className="smart-caption">
            What are you looking for?
            <CircleHelp size={18} />
          </p>
          <div className="filter-search-box">
            <textarea
              value={smartInput}
              onChange={(event) => setSmartInput(event.target.value)}
              placeholder="Example: I want a place with great reviews and free cancellation"
            />
          </div>
          <button type="button" className="filter-search-button" onClick={() => setSmartQuery(smartInput.trim())}>
            <span>Find properties</span>
            <span className="search-button-icon">
              <House size={12} />
            </span>
          </button>
          {smartQuery ? (
            <button type="button" className="filter-search-button" onClick={() => setSmartQuery('')}>
              <span>Clear smart filter</span>
              <span className="search-button-icon">
                <House size={12} />
              </span>
            </button>
          ) : null}
        </div>

        <div className="filter-category filter-divider">
          <h4>Review score</h4>
          {renderOptions(filters.reviewScore)}
        </div>

        <div className="filter-category filter-divider">
          <h4>Beach access</h4>
          {renderOptions(filters.beachAccess)}
        </div>

        <div className="filter-category filter-divider small-control-section">
          <h4>Bedrooms and bathrooms</h4>
          <div className="stepper-row">
            <span>Bedrooms</span>
            <div className="stepper-control">
              <button type="button" aria-label="Decrease bedrooms" onClick={() => setBedrooms((current) => Math.max(0, current - 1))}>
                <Minus size={14} />
              </button>
              <span>{bedrooms}</span>
              <button type="button" aria-label="Increase bedrooms" onClick={() => setBedrooms((current) => Math.min(12, current + 1))}>
                <Plus size={14} />
              </button>
            </div>
          </div>
          <div className="stepper-row">
            <span>Bathrooms</span>
            <div className="stepper-control">
              <button type="button" aria-label="Decrease bathrooms" onClick={() => setBathrooms((current) => Math.max(0, current - 1))}>
                <Minus size={14} />
              </button>
              <span>{bathrooms}</span>
              <button type="button" aria-label="Increase bathrooms" onClick={() => setBathrooms((current) => Math.min(12, current + 1))}>
                <Plus size={14} />
              </button>
            </div>
          </div>
        </div>

        <div className="filter-category filter-divider">
          <h4>Highly rated features</h4>
          <p className="section-subtext">Based on guest reviews</p>
          {renderOptions(filters.highlyRatedFeatures)}
        </div>

        <div className="filter-category filter-divider">
          <h4>Travel group</h4>
          {renderOptions(filters.travelGroup)}
        </div>

        <div className="filter-category filter-divider">
          <h4>Brands</h4>
          {renderOptions(visibleBrands)}
          <button
            type="button"
            className={`show-all-button ${showAllBrands ? 'is-expanded' : ''}`}
            onClick={() => setShowAllBrands((current) => !current)}
            aria-expanded={showAllBrands}
          >
            <span>{showAllBrands ? 'Show fewer brands' : 'Show all brands'}</span>
            <span className="show-all-icon">
              <ChevronDown size={15} />
            </span>
          </button>
        </div>

        <div className="filter-category filter-divider">
          <h4>Fun things to do</h4>
          {renderOptions(filters.funThings)}
        </div>

        <div className="filter-category filter-divider">
          <h4>Certifications</h4>
          {renderOptions(filters.certifications)}
        </div>

        <div className="filter-category filter-divider filter-footer-spacing">
          <h4>Property rating</h4>
          <p className="section-subtext">The (e.g.) star rating and review ratings</p>
          {renderOptions(filters.propertyRating)}
        </div>
      </div>
    </div>
  );
};

export default FilterPanel;
