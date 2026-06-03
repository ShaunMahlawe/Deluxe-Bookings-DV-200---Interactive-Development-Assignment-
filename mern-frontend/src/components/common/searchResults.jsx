import React, { useEffect, useMemo, useRef, useState } from 'react';
import { ArrowUpDown, ChevronDown, ChevronRight, CircleCheck, CircleX, Info, MapPinned, Heart, Star } from 'lucide-react';
import FilterPanel from './filter.jsx';
import './searchResults.css';
import Footer from './footer.jsx';
import Carousel from './carousel.jsx';

const defaultSearchData = {
  breadcrumbs: ['Home', 'South Africa', 'Western Cape', 'Cape Town', 'Search results'],
  heading: 'Cape Town: 7,703 properties found',
  sortLabel: 'Sort by: Our top picks',
  alertText: '17% of places to stay are unavailable for your selected dates. 83% remain available for your search.',
  stayNights: 1,
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

const categoryImageQueryMap = {
  'entire home and apartment': 'house,apartment,interior',
  apartment: 'apartment,interior',
  'guest house': 'house,hotel',
  lodge: 'cabin,lodge',
  villa: 'villa,house,pool',
  resort: 'resort,hotel,pool',
  'bed and breakfast': 'bedroom,house,interior',
};

function getCategoryFallbackImage(category, propertyId, variant = 0) {
  const categoryKey = String(category || '').trim().toLowerCase();
  const query = categoryImageQueryMap[categoryKey] || 'hotel,house,interior';
  const idMatch = String(propertyId || '').match(/^sa-(\d+)$/i);
  const parsedIndex = Number(idMatch?.[1]);
  const propertyNumber = Number.isFinite(parsedIndex) && parsedIndex > 0 ? parsedIndex : 1;
  const signature = (propertyNumber * 11) + Math.max(0, Number(variant) || 0);
  return `https://loremflickr.com/1400/900/${encodeURIComponent(query)}?lock=${signature}`;
}

function resolvePropertyImage(card) {
  if (card.imageUrl) {
    return card.imageUrl;
  }

  const propertyId = String(card?.id || '').trim().toLowerCase();
  const categoryImage = getCategoryFallbackImage(card?.category, propertyId);
  if (categoryImage) {
    return categoryImage;
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

function toNumber(value) {
  const numeric = Number(String(value || '').replace(/[^0-9.]/g, ''));
  return Number.isFinite(numeric) ? numeric : 0;
}

function normalizeText(value) {
  return String(value || '').toLowerCase();
}

const brandDefinitions = [
  { id: 'curated-stays', label: 'Curated Stays Collection' },
  { id: 'coastal-club', label: 'Coastal Club' },
  { id: 'urban-signature', label: 'Urban Signature' },
  { id: 'safari-private', label: 'Safari Private Lodges' },
  { id: 'protea-marriott', label: 'Protea Hotels by Marriott' },
];

function deriveBrandMeta(card) {
  const explicitBrandId = String(card?.brandId || '').trim().toLowerCase();
  const explicitBrandLabel = String(card?.brand || '').trim();

  if (explicitBrandId || explicitBrandLabel) {
    return {
      id: explicitBrandId,
      label: explicitBrandLabel,
    };
  }

  const idMatch = String(card?.id || '').match(/^sa-(\d+)$/i);
  const parsedIndex = Number(idMatch?.[1]) - 1;

  if (!Number.isFinite(parsedIndex) || parsedIndex < 0) {
    return { id: '', label: '' };
  }

  const derived = brandDefinitions[parsedIndex % brandDefinitions.length] || { id: '', label: '' };
  return derived;
}

function deriveFunThings(card) {
  const explicit = Array.isArray(card?.funThings) ? card.funThings.filter(Boolean) : [];
  if (explicit.length > 0) {
    return explicit;
  }

  const idMatch = String(card?.id || '').match(/^sa-(\d+)$/i);
  const parsedIndex = Number(idMatch?.[1]) - 1;
  const fallback = ['Fitness centre'];

  if (Boolean(card?.coastline)) {
    fallback.push('Beach');
  }

  if (Number.isFinite(parsedIndex) && parsedIndex >= 0) {
    if (parsedIndex % 4 === 0) {
      fallback.push('Golf course (within 3 km)');
    }
    if (parsedIndex % 2 === 0) {
      fallback.push('Hiking');
    }
    if (parsedIndex % 3 === 0) {
      fallback.push('Cycling');
    }
  }

  return fallback;
}

function deriveStarRating(card) {
  const idMatch = String(card?.id || '').match(/^sa-(\d+)$/i);
  const parsedIndex = Number(idMatch?.[1]) - 1;

  if (Number.isFinite(parsedIndex) && parsedIndex >= 0) {
    return 1 + (parsedIndex % 5);
  }

  const explicitStars = Number(card?.stars || 0);
  return explicitStars >= 1 && explicitStars <= 5 ? explicitStars : 5;
}

function deriveSustainabilityCertification(card) {
  if (typeof card?.sustainabilityCertification === 'boolean') {
    return card.sustainabilityCertification;
  }

  const amenities = Array.isArray(card?.amenities) ? card.amenities.join(' ').toLowerCase() : '';
  if (amenities.includes('sustainability certification')) {
    return true;
  }

  const idMatch = String(card?.id || '').match(/^sa-(\d+)$/i);
  const parsedIndex = Number(idMatch?.[1]) - 1;
  return Number.isFinite(parsedIndex) && parsedIndex >= 0 ? parsedIndex % 5 === 0 : false;
}

function deriveBreakfastQuality(card) {
  if (typeof card?.veryGoodBreakfast === 'boolean') {
    return card.veryGoodBreakfast;
  }

  const explicitScore = Number(card?.breakfastScore || 0);
  if (Number.isFinite(explicitScore) && explicitScore > 0) {
    return explicitScore >= 8.4;
  }

  const idMatch = String(card?.id || '').match(/^sa-(\d+)$/i);
  const parsedIndex = Number(idMatch?.[1]) - 1;
  return Number.isFinite(parsedIndex) && parsedIndex >= 0 ? parsedIndex % 5 === 0 : false;
}

function deriveTravelGroupFlags(card) {
  const idMatch = String(card?.id || '').match(/^sa-(\d+)$/i);
  const parsedIndex = Number(idMatch?.[1]) - 1;

  if (!Number.isFinite(parsedIndex) || parsedIndex < 0) {
    return {
      petsAllowed: Boolean(card?.petsAllowed),
      adultsOnly: Boolean(card?.adultsOnly),
      travelProudLgbtqFriendly: Boolean(card?.travelProudLgbtqFriendly),
    };
  }

  return {
    petsAllowed: Boolean(card?.petsAllowed) || parsedIndex % 4 === 0,
    adultsOnly: Boolean(card?.adultsOnly) || parsedIndex % 6 === 0,
    travelProudLgbtqFriendly: Boolean(card?.travelProudLgbtqFriendly) || parsedIndex % 3 === 0,
  };
}

function getCardHaystack(card) {
  const details = Array.isArray(card?.unitDetails) ? card.unitDetails.join(' ') : '';
  const amenities = Array.isArray(card?.amenities) ? card.amenities.join(' ') : '';
  const brandMeta = deriveBrandMeta(card);
  const funThings = deriveFunThings(card).join(' ');
  const hasSustainabilityCertification = deriveSustainabilityCertification(card);
  const hasVeryGoodBreakfast = deriveBreakfastQuality(card);

  return normalizeText(
    [
      card?.title,
      card?.area,
      card?.city,
      card?.province,
      card?.category,
      card?.brand,
      card?.brandId,
      brandMeta.label,
      brandMeta.id,
      funThings,
      hasSustainabilityCertification ? 'sustainability certification' : '',
      hasVeryGoodBreakfast ? 'very good breakfast' : '',
      card?.dealTag,
      card?.tag,
      card?.distanceLabel,
      card?.beachLabel,
      card?.unitType,
      details,
      amenities,
      card?.freeCancellation ? 'free cancellation' : '',
    ].join(' ')
  );
}

function inferBedrooms(card) {
  const text = getCardHaystack(card);
  const match = text.match(/(\d+)\s*bedroom/) || text.match(/(\d+)\s*beds?/);
  return Number(match?.[1]) || 0;
}

function inferBathrooms(card) {
  const text = getCardHaystack(card);
  const match = text.match(/(\d+)\s*bathroom/);
  return Number(match?.[1]) || 0;
}

function optionMatchesCard(card, option) {
  const id = normalizeText(option?.id);
  const label = normalizeText(option?.label);
  const haystack = getCardHaystack(card);
  const travelGroupFlags = deriveTravelGroupFlags(card);
  const brandMeta = deriveBrandMeta(card);
  const cardFunThings = deriveFunThings(card).map((item) => normalizeText(item));

  if (id.includes('superb-9')) {
    return Number(card?.reviewScore || 0) >= 9;
  }
  if (id.includes('very-good-8')) {
    return Number(card?.reviewScore || 0) >= 8;
  }
  if (id.includes('good-7')) {
    return Number(card?.reviewScore || 0) >= 7;
  }
  if (id.includes('pleasant-6')) {
    return Number(card?.reviewScore || 0) >= 6;
  }

  if (id.startsWith('star-')) {
    const expectedStars = Number(id.replace('star-', ''));
    return deriveStarRating(card) === expectedStars;
  }

  if (id.includes('apartments')) {
    return haystack.includes('apartment');
  }
  if (id.includes('entire-homes')) {
    return haystack.includes('entire home and apartment');
  }
  if (id.includes('chalets')) {
    return haystack.includes('chalet');
  }
  if (id.includes('bed-and-breakfast')) {
    return haystack.includes('bed and breakfast');
  }
  if (id.includes('holiday-homes')) {
    return haystack.includes('holiday home');
  }
  if (id.includes('homestays')) {
    return haystack.includes('homestay');
  }
  if (id.includes('country-houses')) {
    return haystack.includes('country house');
  }
  if (id.includes('luxury-tents')) {
    return haystack.includes('luxury tent');
  }
  if (id.includes('hostels')) {
    return haystack.includes('hostel');
  }
  if (id.includes('lodges')) {
    return haystack.includes('lodge');
  }
  if (id.includes('resorts')) {
    return haystack.includes('resort');
  }
  if (id.includes('boats')) {
    return haystack.includes('boat');
  }
  if (id.includes('hotels')) {
    return haystack.includes('hotel');
  }
  if (id.includes('guest-houses')) {
    return haystack.includes('guest house');
  }
  if (id.includes('villas')) {
    return haystack.includes('villa');
  }

  if (id.includes('waterfront')) {
    return haystack.includes('waterfront');
  }
  if (id.includes('camps-bay')) {
    return haystack.includes('camps bay');
  }
  if (id.includes('green-point')) {
    return haystack.includes('green point');
  }
  if (id.includes('beach-fun')) {
    return cardFunThings.some((item) => item.includes('beach')) || haystack.includes('beach');
  }

  if (id.includes('golf-fun')) {
    return cardFunThings.some((item) => item.includes('golf')) || haystack.includes('golf');
  }

  if (id.includes('hiking-fun')) {
    return cardFunThings.some((item) => item.includes('hiking')) || haystack.includes('hiking');
  }

  if (id.includes('fitness-fun')) {
    return cardFunThings.some((item) => item.includes('fitness centre')) || haystack.includes('fitness centre');
  }

  if (id.includes('cycling-fun')) {
    return cardFunThings.some((item) => item.includes('cycling')) || haystack.includes('cycling');
  }

  if (id.includes('sustainability')) {
    return deriveSustainabilityCertification(card);
  }

  if (id.includes('very-good-breakfast')) {
    return deriveBreakfastQuality(card);
  }

  if (id.includes('beach')) {
    return haystack.includes('beach');
  }
  if (id.includes('parking')) {
    return haystack.includes('parking');
  }

  if (brandMeta.id && id === brandMeta.id) {
    return true;
  }

  if (id === 'pets') {
    return travelGroupFlags.petsAllowed || haystack.includes('pets allowed') || haystack.includes('pet friendly');
  }

  if (id.includes('adults-only')) {
    return travelGroupFlags.adultsOnly || haystack.includes('adults only');
  }

  if (id.includes('travel-proud') || id.includes('large-group')) {
    return travelGroupFlags.travelProudLgbtqFriendly
      || haystack.includes('travel proud')
      || haystack.includes('lgbtq')
      || haystack.includes('lgbt');
  }

  const fallbackKeywords = label
    .split(/[^a-z0-9+]+/)
    .filter((word) => word.length > 2 && !['and', 'the', 'with', 'for', 'near'].includes(word));

  if (fallbackKeywords.length === 0) {
    return true;
  }

  return fallbackKeywords.some((keyword) => haystack.includes(keyword));
}

function applyCardFilters(cards, filters) {
  const selectedOptions = Array.isArray(filters?.selectedOptions) ? filters.selectedOptions : [];
  const minPrice = Number(filters?.budgetMin) || 0;
  const maxPrice = Number(filters?.budgetMax) || Number.MAX_SAFE_INTEGER;
  const minBedrooms = Number(filters?.bedrooms) || 0;
  const minBathrooms = Number(filters?.bathrooms) || 0;
  const smartTerms = normalizeText(filters?.smartQuery)
    .split(/\s+/)
    .filter(Boolean);

  return cards.filter((card) => {
    const price = toNumber(card?.price);
    if (price < minPrice || price > maxPrice) {
      return false;
    }

    if (inferBedrooms(card) < minBedrooms) {
      return false;
    }

    if (inferBathrooms(card) < minBathrooms) {
      return false;
    }

    if (selectedOptions.length > 0 && !selectedOptions.every((option) => optionMatchesCard(card, option))) {
      return false;
    }

    if (smartTerms.length > 0) {
      const haystack = getCardHaystack(card);
      if (!smartTerms.every((term) => haystack.includes(term))) {
        return false;
      }
    }

    return true;
  });
}

function collectFilterOptions(filterData) {
  if (!filterData || typeof filterData !== 'object') {
    return [];
  }

  const sectionKeys = [
    'previousFiltersTop',
    'propertyFilters',
    'reviewScore',
    'beachAccess',
    'previousFiltersBottom',
    'highlyRatedFeatures',
    'travelGroup',
    'brands',
    'funThings',
    'certifications',
    'propertyRating',
  ];

  const options = [];

  sectionKeys.forEach((key) => {
    const entries = Array.isArray(filterData[key]) ? filterData[key] : [];
    entries.forEach((entry) => {
      if (entry?.id) {
        options.push({ id: entry.id, label: entry.label || entry.id });
      }
    });
  });

  return options;
}

function buildOptionCounts(cards, options) {
  const counts = {};

  options.forEach((option) => {
    counts[option.id] = cards.reduce((total, card) => {
      return total + (optionMatchesCard(card, option) ? 1 : 0);
    }, 0);
  });

  return counts;
}

function buildBudgetHistogram(cards, binCount = 20) {
  const prices = cards.map((card) => toNumber(card.price)).filter((price) => price > 0);
  if (prices.length === 0) {
    return {
      bins: Array.from({ length: binCount }, (_, index) => ({
        index,
        count: 0,
        min: 0,
        max: 0,
      })),
    };
  }

  const min = Math.min(...prices);
  const max = Math.max(...prices);
  const span = Math.max(1, max - min);
  const step = span / binCount;
  const counts = Array.from({ length: binCount }, () => 0);

  prices.forEach((price) => {
    const rawIndex = Math.floor((price - min) / span * binCount);
    const clampedIndex = Math.min(binCount - 1, Math.max(0, rawIndex));
    counts[clampedIndex] += 1;
  });

  return {
    bins: counts.map((count, index) => ({
      index,
      count,
      min: min + step * index,
      max: min + step * (index + 1),
    })),
  };
}

function slugify(value) {
  return normalizeText(value).replace(/[^a-z0-9+]+/g, '-').replace(/^-+|-+$/g, '');
}

function mapCategoryToFilterMeta(category) {
  const key = normalizeText(category);

  const known = {
    'entire home and apartment': { id: 'entire-homes', label: 'Entire homes and apartments' },
    apartment: { id: 'apartments', label: 'Apartments' },
    'guest house': { id: 'guest-houses', label: 'Guest houses' },
    hotel: { id: 'hotels', label: 'Hotels' },
    'holiday home': { id: 'holiday-homes', label: 'Holiday homes' },
    'holiday stay': { id: 'holiday-homes', label: 'Holiday homes' },
    villa: { id: 'villas', label: 'Villas' },
    'bed and breakfast': { id: 'bed-and-breakfast', label: 'Bed and Breakfast' },
    homestay: { id: 'homestays', label: 'Homestays' },
    hostel: { id: 'hostels', label: 'Hostels' },
    lodge: { id: 'lodges', label: 'Lodges' },
    chalet: { id: 'chalets', label: 'Chalets' },
    resort: { id: 'resorts', label: 'Resorts' },
    boat: { id: 'boats', label: 'Boats' },
    'country house': { id: 'country-houses', label: 'Country houses' },
    'luxury tent': { id: 'luxury-tents', label: 'Luxury tents' },
  };

  if (known[key]) {
    return known[key];
  }

  const fallbackLabel = String(category || 'Other stays').trim() || 'Other stays';
  return {
    id: `property-type-${slugify(fallbackLabel) || 'other'}`,
    label: fallbackLabel,
  };
}

function buildDynamicFilterData(cards, fallbackData) {
  const sourceCards = Array.isArray(cards) ? cards : [];
  const fallback = fallbackData || {};

  if (sourceCards.length === 0) {
    return fallback;
  }

  const categoryMap = new Map();
  const neighborhoodMap = new Map();
  const funThingsMap = new Map();
  const brandsMap = new Map();

  let beachNearbyCount = 0;
  let parkingCount = 0;
  let freeCancellationCount = 0;
  let breakfastIncludedCount = 0;
  let veryGoodBreakfastCount = 0;
  let sustainabilityCount = 0;
  let petsAllowedCount = 0;
  let adultsOnlyCount = 0;
  let travelProudCount = 0;

  const reviewBuckets = { superb9: 0, veryGood8: 0, good7: 0, pleasant6: 0 };
  const starBuckets = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };

  sourceCards.forEach((card) => {
    const score = Number(card?.reviewScore) || 0;
    const categoryMeta = mapCategoryToFilterMeta(card?.category);
    categoryMap.set(categoryMeta.id, {
      id: categoryMeta.id,
      label: categoryMeta.label,
      count: (categoryMap.get(categoryMeta.id)?.count || 0) + 1,
    });

    const neighborhood = String(card?.area || '').split(',')[0]?.trim();
    if (neighborhood) {
      const id = `area-${slugify(neighborhood)}`;
      neighborhoodMap.set(id, {
        id,
        label: neighborhood,
        count: (neighborhoodMap.get(id)?.count || 0) + 1,
      });
    }

    if (score >= 9) reviewBuckets.superb9 += 1;
    if (score >= 8) reviewBuckets.veryGood8 += 1;
    if (score >= 7) reviewBuckets.good7 += 1;
    if (score >= 6) reviewBuckets.pleasant6 += 1;

    const stars = deriveStarRating(card);
    if (starBuckets[stars] !== undefined) {
      starBuckets[stars] += 1;
    }

    const haystack = getCardHaystack(card);
    const travelFlags = deriveTravelGroupFlags(card);
    const hasVeryGoodBreakfast = deriveBreakfastQuality(card);
    const hasSustainabilityCertification = deriveSustainabilityCertification(card);
    const brandMeta = deriveBrandMeta(card);

    if (haystack.includes('beach') || Boolean(card?.coastline)) beachNearbyCount += 1;
    if (haystack.includes('parking')) parkingCount += 1;
    if (Boolean(card?.freeCancellation)) freeCancellationCount += 1;
    if (haystack.includes('breakfast')) breakfastIncludedCount += 1;
    if (hasVeryGoodBreakfast) veryGoodBreakfastCount += 1;
    if (hasSustainabilityCertification) sustainabilityCount += 1;
    if (travelFlags.petsAllowed || haystack.includes('pets allowed') || haystack.includes('pet friendly')) petsAllowedCount += 1;
    if (travelFlags.adultsOnly || haystack.includes('adults only')) adultsOnlyCount += 1;
    if (travelFlags.travelProudLgbtqFriendly || haystack.includes('travel proud') || haystack.includes('lgbtq')) travelProudCount += 1;

    const brandLabel = String(brandMeta.label || card?.brand || '').trim();
    if (brandLabel) {
      const brandId = String(brandMeta.id || slugify(brandLabel)).trim().toLowerCase();
      brandsMap.set(brandId, {
        id: brandId,
        label: brandLabel,
        count: (brandsMap.get(brandId)?.count || 0) + 1,
      });
    }

    deriveFunThings(card).forEach((item) => {
      const label = String(item || '').trim();
      if (!label) {
        return;
      }

      const id = `fun-${slugify(label)}`;
      funThingsMap.set(id, {
        id,
        label,
        count: (funThingsMap.get(id)?.count || 0) + 1,
      });
    });
  });

  const sortedCategories = Array.from(categoryMap.values()).sort((a, b) => b.count - a.count);
  const sortedNeighborhoods = Array.from(neighborhoodMap.values()).sort((a, b) => b.count - a.count).slice(0, 3);
  const sortedBrands = Array.from(brandsMap.values()).sort((a, b) => b.count - a.count);
  const sortedFunThings = Array.from(funThingsMap.values()).sort((a, b) => b.count - a.count).slice(0, 6);

  return {
    ...fallback,
    previousFiltersTop: sortedCategories,
    previousFiltersBottom: [],
    propertyFilters: [
      { id: 'breakfast-included', label: 'Breakfast included', count: breakfastIncludedCount },
      { id: 'free-cancellation', label: 'Free cancellation', count: freeCancellationCount },
      { id: 'parking', label: 'Parking', count: parkingCount },
      ...sortedNeighborhoods,
    ].filter((item) => Number(item?.count) > 0),
    reviewScore: [
      { id: 'superb-9', label: 'Superb: 9+', count: reviewBuckets.superb9 },
      { id: 'very-good-8', label: 'Very good: 8+', count: reviewBuckets.veryGood8 },
      { id: 'good-7', label: 'Good: 7+', count: reviewBuckets.good7 },
      { id: 'pleasant-6', label: 'Pleasant: 6+', count: reviewBuckets.pleasant6 },
    ],
    beachAccess: [{ id: 'beach-access', label: 'Beach nearby', count: beachNearbyCount }],
    highlyRatedFeatures: [{ id: 'very-good-breakfast', label: 'Very good breakfast', count: veryGoodBreakfastCount }],
    travelGroup: [
      { id: 'pets', label: 'Pets allowed', count: petsAllowedCount },
      { id: 'adults-only', label: 'Adults only', count: adultsOnlyCount },
      { id: 'travel-proud-lgbtq', label: 'Travel Proud: LGBTQ+ friendly', count: travelProudCount },
    ],
    brands: sortedBrands,
    funThings: sortedFunThings,
    certifications: [{ id: 'sustainability', label: 'Sustainability certification', count: sustainabilityCount }],
    propertyRating: [1, 2, 3, 4, 5].map((stars) => ({
      id: `star-${stars}`,
      label: `${stars} star${stars > 1 ? 's' : ''}`,
      count: starBuckets[stars] || 0,
    })),
  };
}

function sortCards(cards, sortBy) {
  const nextCards = [...cards];

  if (sortBy === 'rating') {
    return nextCards.sort((a, b) => (b.reviewScore || 0) - (a.reviewScore || 0));
  }

  if (sortBy === 'priceLow') {
    return nextCards.sort((a, b) => toNumber(a.price) - toNumber(b.price));
  }

  if (sortBy === 'priceHigh') {
    return nextCards.sort((a, b) => toNumber(b.price) - toNumber(a.price));
  }

  if (sortBy === 'reviews') {
    return nextCards.sort((a, b) => (b.reviewCount || 0) - (a.reviewCount || 0));
  }

  return nextCards.sort((a, b) => {
    const scoreDelta = (b.reviewScore || 0) - (a.reviewScore || 0);
    if (scoreDelta !== 0) {
      return scoreDelta;
    }

    return (b.reviewCount || 0) - (a.reviewCount || 0);
  });
}

function getCardSaveKey(card) {
  const idKey = String(card?.id || '').trim();
  if (idKey) {
    return idKey;
  }

  return `${String(card?.title || '').trim()}|${String(card?.area || '').trim()}|${String(card?.price || '').trim()}`;
}

function getCardMapUrl(card) {
  const directMapUrl = String(card?.googleMapsUri || '').trim();
  if (directMapUrl) {
    return directMapUrl;
  }

  const latitude = Number(card?.location?.lat);
  const longitude = Number(card?.location?.lng);
  if (Number.isFinite(latitude) && Number.isFinite(longitude)) {
    return `https://www.google.com/maps?q=${encodeURIComponent(`${latitude},${longitude}`)}`;
  }

  const title = String(card?.title || '').trim();
  const area = String(card?.area || '').trim();
  const query = [title, area].filter(Boolean).join(' ');
  return `https://www.google.com/maps/search/${encodeURIComponent(query || 'luxury property south africa')}`;
}

function formatZarTotal(value, nights) {
  const baseAmount = toNumber(value);
  if (!Number.isFinite(baseAmount) || baseAmount <= 0) {
    return String(value || '');
  }

  const safeNights = Math.max(1, Number(nights) || 1);
  return `ZAR ${Math.round(baseAmount * safeNights).toLocaleString()}`;
}

function formatTaxTotalLine(value, nights) {
  const baseAmount = toNumber(value);
  const safeNights = Math.max(1, Number(nights) || 1);
  const resolvedAmount = Number.isFinite(baseAmount) && baseAmount > 0 ? baseAmount : 480;
  return `+ ZAR ${Math.round(resolvedAmount * safeNights).toLocaleString()} taxes and charges`;
}

function sanitizeUnitDetails(details) {
  return (Array.isArray(details) ? details : []).filter((item) => {
    const value = String(item || '').trim();
    if (!value) {
      return false;
    }

    const normalized = value.toLowerCase();
    if (normalized.includes('http://') || normalized.includes('https://') || normalized.includes('www.')) {
      return false;
    }

    return !normalized.includes('google.com/maps');
  });
}

const PropertyCard = ({ card, keyPrefix, isSaved, onToggleSave, stayNights = 1 }) => {
  const renderedOldPrice = formatZarTotal(card.oldPrice || 'ZAR 1,429', stayNights);
  const renderedPrice = formatZarTotal(card.price, stayNights);
  const renderedTaxLine = formatTaxTotalLine(card.taxesAndCharges || 'ZAR 480', stayNights);
  const reviewsSectionId = `${keyPrefix}-reviews-${String(card?.id || 'card').replace(/[^a-z0-9-]/gi, '-')}`;
  const visibleUnitDetails = sanitizeUnitDetails(card.unitDetails);

  return (
  <article className="property-card" key={card.id}>
    <div className="property-image" style={{ backgroundImage: `url(${resolvePropertyImage(card)})` }}>
      <button
        type="button"
        className={`favourite-button ${isSaved ? 'is-saved' : ''}`}
        aria-label={isSaved ? 'Remove from saved properties' : 'Save this property'}
        aria-pressed={isSaved}
        onClick={onToggleSave}
      >
        <Heart size={22} fill={isSaved ? 'currentColor' : 'none'} strokeWidth={2} />
      </button>
    </div>

    <div className="property-body">
      <h2>{card.title}</h2>
      <div className="card-stars" aria-label={`${deriveStarRating(card)} star rating`}>
        {Array.from({ length: deriveStarRating(card) }).map((_, index) => (
          <Star key={`${keyPrefix}-star-${card.id}-${index}`} size={18} fill="currentColor" strokeWidth={1.8} />
        ))}
      </div>
      <span className="card-tag">{card.tag || 'New to Deluxe Bookings'}</span>

      <div className="score-row">
        <span className="score-pill">{card.reviewScore || 8.2}</span>
        <span>{card.reviewSummary || 'Very good'}</span>
        <button
          type="button"
          className="review-jump-button"
          onClick={() => {
            const target = document.getElementById(reviewsSectionId);
            if (target) {
              target.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            }
          }}
        >
          {card.reviewCount || 0} reviews
        </button>
      </div>

      <p className="value-text">Value for money {card.valueForMoney || 8.4}</p>
      <div className="location-row">
        <span>{card.area}</span>
      </div>

      <a
        className="show-on-map-button"
        href={getCardMapUrl(card)}
        target="_blank"
        rel="noopener noreferrer"
      >
        Show on map
      </a>

      <span className="deal-chip">{card.dealTag || 'Getaway Deal'}</span>

      <div className="rule-line" />

      <p className="unit-type">{card.unitType || 'Two-Bedroom Apartment'}</p>
      <ul className="unit-list">
        {visibleUnitDetails.map((item) => (
          <li key={`${card.id}-${item}`}>{item}</li>
        ))}
      </ul>

      <section id={reviewsSectionId} className="card-reviews-section" aria-label="Property reviews">
        <h3>Guest reviews</h3>
        <p>{`${card.reviewSummary || 'Very good'}: ${Number(card.reviewScore || 8.2).toFixed(1)} / 10`}</p>
        <p>{`${card.reviewCount || 0} verified reviews`}</p>
      </section>

      {card.freeCancellation ? (
        <div className="cancel-row">
          <CircleCheck size={18} />
          <span>Free cancellation</span>
        </div>
      ) : null}

      <div className="price-footer">
        <span className="old-price">{renderedOldPrice}</span>
        <span className="new-price">{renderedPrice}</span>
      </div>
      <p className="tax-line">{renderedTaxLine}</p>
    </div>
  </article>
  );
};

const SearchResults = ({ searchData, filterData, thingsToDoData, footerData }) => {
  const content = searchData || defaultSearchData;
  const cards = Array.isArray(content.properties) ? content.properties : defaultSearchData.properties;
  const breadcrumbItems = content.breadcrumbs || defaultSearchData.breadcrumbs;
  const sortOptions = [
    { value: 'top', label: 'Our top picks' },
    { value: 'rating', label: 'Guest rating (high to low)' },
    { value: 'priceLow', label: 'Price (low to high)' },
    { value: 'priceHigh', label: 'Price (high to low)' },
    { value: 'reviews', label: 'Most reviewed' },
  ];
  const [isSortOpen, setIsSortOpen] = useState(false);
  const [sortBy, setSortBy] = useState('top');
  const [isAlertVisible, setIsAlertVisible] = useState(true);
  const [isExpanded, setIsExpanded] = useState(false);
  const [collapsedVisibleCount, setCollapsedVisibleCount] = useState(3);
  const [savedCardKeys, setSavedCardKeys] = useState(() => new Set());
  const [activeFilters, setActiveFilters] = useState({
    selectedOptions: [],
    bedrooms: 0,
    bathrooms: 0,
    budgetMin: 0,
    budgetMax: Number.MAX_SAFE_INTEGER,
    smartQuery: '',
  });
  const sortRef = useRef(null);
  const leftColumnRef = useRef(null);
  const rightColumnRef = useRef(null);
  const featuredGridRef = useRef(null);

  const selectedSortLabel = sortOptions.find((option) => option.value === sortBy)?.label || sortOptions[0].label;
  const areaName = breadcrumbItems[breadcrumbItems.length - 2] || 'Cape Town';
  const stayNights = Math.max(1, Number(content?.stayNights) || 1);

  const priceBounds = useMemo(() => {
    const prices = cards.map((card) => toNumber(card.price)).filter((price) => price > 0);
    if (prices.length === 0) {
      return { min: 300, max: 5000 };
    }

    const min = Math.floor(Math.min(...prices) / 100) * 100;
    const max = Math.ceil(Math.max(...prices) / 100) * 100;
    return { min, max };
  }, [cards]);

  const totalFoundCards = Array.isArray(content?.filterSourceProperties) && content.filterSourceProperties.length > 0
    ? content.filterSourceProperties
    : cards;
  const resolvedFilterData = useMemo(
    () => buildDynamicFilterData(totalFoundCards, filterData),
    [totalFoundCards, filterData]
  );
  const filteredCards = useMemo(() => applyCardFilters(totalFoundCards, activeFilters), [totalFoundCards, activeFilters]);
  const filterOptions = useMemo(() => collectFilterOptions(resolvedFilterData), [resolvedFilterData]);
  const optionCounts = useMemo(() => buildOptionCounts(totalFoundCards, filterOptions), [totalFoundCards, filterOptions]);
  const budgetHistogram = useMemo(() => buildBudgetHistogram(totalFoundCards), [totalFoundCards]);
  const sortedCards = useMemo(() => sortCards(filteredCards, sortBy), [filteredCards, sortBy]);
  const headingLocation = useMemo(() => {
    const rawHeading = String(content.heading || '').trim();
    const [locationFromHeading] = rawHeading.split(':');
    return locationFromHeading?.trim() || areaName;
  }, [content.heading, areaName]);
  const hasActiveFilters = useMemo(() => {
    const selectedOptions = Array.isArray(activeFilters?.selectedOptions) ? activeFilters.selectedOptions : [];
    const hasSelectedOptions = selectedOptions.length > 0;
    const hasBedroomFilter = Number(activeFilters?.bedrooms) > 0;
    const hasBathroomFilter = Number(activeFilters?.bathrooms) > 0;
    const hasSmartQuery = String(activeFilters?.smartQuery || '').trim().length > 0;
    const hasBudgetMinFilter = Number(activeFilters?.budgetMin) > Number(priceBounds?.min || 0);
    const hasBudgetMaxFilter = Number(activeFilters?.budgetMax) < Number(priceBounds?.max || Number.MAX_SAFE_INTEGER);

    return hasSelectedOptions || hasBedroomFilter || hasBathroomFilter || hasSmartQuery || hasBudgetMinFilter || hasBudgetMaxFilter;
  }, [activeFilters, priceBounds]);
  const headingCount = Number(content?.totalPropertiesFound);
  const baseHeadingCount = Number.isFinite(headingCount) && headingCount > 0 ? headingCount : sortedCards.length;
  const resolvedHeadingCount = hasActiveFilters ? sortedCards.length : baseHeadingCount;
  const headingText = `${headingLocation}: ${resolvedHeadingCount.toLocaleString()} ${resolvedHeadingCount === 1 ? 'property' : 'properties'} found`;
  const initialVisibleCount = sortedCards.length === 0 ? 0 : Math.min(Math.max(1, collapsedVisibleCount), sortedCards.length);
  const featuredCards = sortedCards.slice(0, initialVisibleCount);
  const remainingCards = sortedCards.slice(initialVisibleCount);
  const hasMoreCards = remainingCards.length > 0;

  const toggleSaveCard = (card) => {
    const cardKey = getCardSaveKey(card);

    setSavedCardKeys((current) => {
      const next = new Set(current);

      if (next.has(cardKey)) {
        next.delete(cardKey);
      } else {
        next.add(cardKey);
      }

      return next;
    });
  };

  useEffect(() => {
    function handleOutsideClick(event) {
      if (sortRef.current && !sortRef.current.contains(event.target)) {
        setIsSortOpen(false);
      }
    }

    document.addEventListener('mousedown', handleOutsideClick);
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, []);

  useEffect(() => {
    setIsAlertVisible(true);
  }, [content.alertText]);

  useEffect(() => {
    function calculateCollapsedCount() {
      const leftColumnEl = leftColumnRef.current;
      const rightColumnEl = rightColumnRef.current;
      const gridEl = featuredGridRef.current;
      const firstCardEl = gridEl?.querySelector('.property-card');

      if (!leftColumnEl || !rightColumnEl || !gridEl || !firstCardEl) {
        return;
      }

      const leftColumnHeight = leftColumnEl.getBoundingClientRect().height;
      const rightTop = rightColumnEl.getBoundingClientRect().top;
      const cardsTop = gridEl.getBoundingClientRect().top;
      const preCardsHeight = Math.max(0, cardsTop - rightTop);
      const availableForCards = Math.max(0, leftColumnHeight - preCardsHeight);

      const gridStyles = window.getComputedStyle(gridEl);
      const rowGap = Number.parseFloat(gridStyles.rowGap || '0') || 0;
      const columns = Math.max(1, gridStyles.gridTemplateColumns.split(' ').filter(Boolean).length);
      const cardHeight = firstCardEl.getBoundingClientRect().height;

      if (cardHeight <= 0) {
        return;
      }

      const rowsThatFit = Math.max(1, Math.floor((availableForCards + rowGap) / (cardHeight + rowGap)));
      const nextCount = Math.min(sortedCards.length, rowsThatFit * columns);

      setCollapsedVisibleCount((current) => (current === nextCount ? current : nextCount));
    }

    calculateCollapsedCount();

    const resizeObserver = new ResizeObserver(() => {
      calculateCollapsedCount();
    });

    if (leftColumnRef.current) {
      resizeObserver.observe(leftColumnRef.current);
    }

    if (rightColumnRef.current) {
      resizeObserver.observe(rightColumnRef.current);
    }

    window.addEventListener('resize', calculateCollapsedCount);

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener('resize', calculateCollapsedCount);
    };
  }, [sortedCards.length, isAlertVisible]);

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
          <aside className="left-column" ref={leftColumnRef}>
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
            <FilterPanel
              data={resolvedFilterData}
              priceBounds={priceBounds}
              optionCounts={optionCounts}
              budgetHistogram={budgetHistogram}
              onFiltersChange={setActiveFilters}
            />
          </aside>

          <section className="right-column" ref={rightColumnRef}>
            <h1>{headingText}</h1>

            <div className="sort-control" ref={sortRef}>
              <button
                type="button"
                className="sort-button"
                aria-haspopup="listbox"
                aria-expanded={isSortOpen}
                onClick={() => setIsSortOpen((current) => !current)}
              >
                <ArrowUpDown size={22} />
                <span>{`Sort by: ${selectedSortLabel}`}</span>
              </button>

              {isSortOpen ? (
                <div className="sort-menu" role="listbox" aria-label="Sort property results">
                  {sortOptions.map((option) => (
                    <button
                      key={option.value}
                      type="button"
                      className={`sort-option ${sortBy === option.value ? 'active' : ''}`}
                      role="option"
                      aria-selected={sortBy === option.value}
                      onClick={() => {
                        setSortBy(option.value);
                        setIsSortOpen(false);
                      }}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              ) : null}
            </div>

            {isAlertVisible ? (
              <div className="site-alert">
                <Info size={16} />
                <span>{content.alertText || defaultSearchData.alertText}</span>
                <button
                  type="button"
                  className="site-alert-dismiss"
                  aria-label="Dismiss site alert"
                  onClick={() => setIsAlertVisible(false)}
                >
                  <CircleX size={18} />
                </button>
              </div>
            ) : null}

            <div className="property-grid property-grid-featured" ref={featuredGridRef}>
              {featuredCards.map((card) => (
                <PropertyCard
                  card={card}
                  keyPrefix="featured"
                  key={`featured-${getCardSaveKey(card)}`}
                  isSaved={savedCardKeys.has(getCardSaveKey(card))}
                  onToggleSave={() => toggleSaveCard(card)}
                  stayNights={stayNights}
                />
              ))}
            </div>

            {sortedCards.length === 0 ? <div className="no-results-message">No properties match your current filters.</div> : null}

            {isExpanded ? (
              <div className="property-grid property-grid-lower">
                {remainingCards.map((card) => (
                  <PropertyCard
                    card={card}
                    keyPrefix="lower"
                    key={`lower-${getCardSaveKey(card)}`}
                    isSaved={savedCardKeys.has(getCardSaveKey(card))}
                    onToggleSave={() => toggleSaveCard(card)}
                    stayNights={stayNights}
                  />
                ))}
              </div>
            ) : null}

            {hasMoreCards ? (
              <div className="view-more-wrap">
                <button
                  type="button"
                  className="view-more-button"
                  onClick={() => setIsExpanded((current) => !current)}
                  aria-expanded={isExpanded}
                >
                  <span>{isExpanded ? 'View less' : 'View more'}</span>
                  <ChevronDown size={18} className={`view-more-arrow ${isExpanded ? 'is-open' : ''}`} />
                </button>
              </div>
            ) : null}

            {!isExpanded ? (
              <Carousel data={thingsToDoData} areaName={areaName} className="inline-things-carousel" />
            ) : null}
          </section>
        </div>
      </div>
      <Footer data={footerData} />
    </div>
  );
};

export default SearchResults;
