const { areaBlueprints, toAreaKey } = require('../utils/southAfricaProperties');

const GOOGLE_PLACES_API_KEY = process.env.GOOGLE_MAPS_API_KEY || '';
const GOOGLE_PLACES_SEARCH_URL = 'https://places.googleapis.com/v1/places:searchText';

const SEARCH_FIELD_MASK = [
  'places.id',
  'places.displayName',
  'places.formattedAddress',
  'places.shortFormattedAddress',
  'places.location',
  'places.rating',
  'places.userRatingCount',
  'places.priceLevel',
  'places.businessStatus',
  'places.primaryType',
  'places.primaryTypeDisplayName',
  'places.types',
  'places.photos',
  'places.googleMapsUri',
].join(',');

const searchCache = new Map();

function isGooglePlacesConfigured() {
  return Boolean(GOOGLE_PLACES_API_KEY);
}

function getAreaBlueprint(value) {
  const areaKey = toAreaKey(value);

  if (!areaKey) {
    return null;
  }

  return areaBlueprints.find((area) => {
    return (
      toAreaKey(area.city).includes(areaKey)
      || toAreaKey(area.province).includes(areaKey)
      || area.neighborhoods.some((neighborhood) => toAreaKey(neighborhood).includes(areaKey))
    );
  }) || null;
}

function getSearchTerms(category) {
  const key = toAreaKey(category);

  if (key.includes('apartment')) {
    return ['apartments', 'apartment stays', 'self-catering apartments'];
  }

  if (key.includes('guest house')) {
    return ['guest houses', 'bed and breakfast'];
  }

  if (key.includes('lodge')) {
    return ['lodges', 'safari lodges'];
  }

  if (key.includes('villa')) {
    return ['villas', 'luxury villas'];
  }

  if (key.includes('resort')) {
    return ['resorts'];
  }

  if (key.includes('bed and breakfast')) {
    return ['bed and breakfast'];
  }

  if (key.includes('entire home')) {
    return ['lodging', 'holiday homes', 'self-catering apartments'];
  }

  return ['lodging'];
}

function buildQueryPlans({ area, category, setting }) {
  const searchTerms = getSearchTerms(category);
  const blueprint = getAreaBlueprint(area);

  if (blueprint) {
    return searchTerms.map((term) => ({
      textQuery: `${term} in ${blueprint.city}, ${blueprint.province}, South Africa`,
      area: blueprint,
    }));
  }

  if (area) {
    return searchTerms.map((term) => ({
      textQuery: `${term} in ${area}, South Africa`,
      area: null,
    }));
  }

  const areas = areaBlueprints.filter((candidate) => {
    if (!setting) {
      return true;
    }

    return toAreaKey(candidate.setting) === toAreaKey(setting);
  });

  return areas.map((candidate) => ({
    textQuery: `lodging in ${candidate.city}, ${candidate.province}, South Africa`,
    area: candidate,
  }));
}

function toText(value) {
  return String(value || '').trim();
}

function toNumber(value, fallback = 0) {
  const numeric = Number(value);
  return Number.isFinite(numeric) ? numeric : fallback;
}

function getPriceValue(priceLevel, rating = 0) {
  const level = String(priceLevel || '').toUpperCase();

  if (level.includes('FREE') || level.includes('INEXPENSIVE')) {
    return 980 + Math.round(rating * 45);
  }

  if (level.includes('MODERATE')) {
    return 1450 + Math.round(rating * 65);
  }

  if (level.includes('EXPENSIVE')) {
    return 2200 + Math.round(rating * 85);
  }

  if (level.includes('VERY_EXPENSIVE')) {
    return 3400 + Math.round(rating * 110);
  }

  return 1350 + Math.round(rating * 55);
}

function getReviewSummary(rating) {
  if (rating >= 9) {
    return 'Superb';
  }

  if (rating >= 8.4) {
    return 'Very good';
  }

  if (rating >= 7.5) {
    return 'Good';
  }

  return 'Fair';
}

function getCategory(place) {
  const displayName = toAreaKey(place?.displayName?.text || place?.displayName);
  const primaryType = toAreaKey(place?.primaryType);
  const types = Array.isArray(place?.types) ? place.types.map(toAreaKey) : [];
  const haystack = [displayName, primaryType, ...types].join(' ');

  if (haystack.includes('villa')) {
    return 'Villa';
  }

  if (haystack.includes('resort')) {
    return 'Resort';
  }

  if (haystack.includes('bed and breakfast') || haystack.includes('bnb') || haystack.includes('guest house')) {
    return 'Bed and Breakfast';
  }

  if (haystack.includes('lodge')) {
    return 'Lodge';
  }

  if (haystack.includes('apartment')) {
    return 'Apartment';
  }

  if (haystack.includes('home') || haystack.includes('holiday')) {
    return 'Entire Home and Apartment';
  }

  if (haystack.includes('hotel') || haystack.includes('motel') || haystack.includes('inn')) {
    return 'Guest House';
  }

  return 'Guest House';
}

function getBrand(place) {
  const name = toText(place?.displayName?.text || place?.displayName);

  if (!name) {
    return 'Independent';
  }

  const chainMatchers = [
    ['protea', 'Protea Hotels by Marriott'],
    ['marriott', 'Marriott'],
    ['radisson', 'Radisson Hotels'],
    ['hilton', 'Hilton'],
    ['holiday inn', 'Holiday Inn'],
    ['southern sun', 'Southern Sun'],
    ['premier', 'Premier Hotels'],
    ['city lodge', 'City Lodge Hotels'],
    ['tsogo', 'Tsogo Sun'],
  ];

  const lowerName = name.toLowerCase();
  const matchedBrand = chainMatchers.find(([needle]) => lowerName.includes(needle));

  return matchedBrand ? matchedBrand[1] : 'Independent';
}

function haversineDistance(lat1, lon1, lat2, lon2) {
  const toRadians = (value) => (value * Math.PI) / 180;
  const earthRadiusKm = 6371;
  const dLat = toRadians(lat2 - lat1);
  const dLon = toRadians(lon2 - lon1);
  const startLat = toRadians(lat1);
  const endLat = toRadians(lat2);

  const a = Math.sin(dLat / 2) ** 2 + Math.cos(startLat) * Math.cos(endLat) * Math.sin(dLon / 2) ** 2;
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return earthRadiusKm * c;
}

function getDistanceLabel(place, area) {
  if (!area?.center || !place?.location) {
    return 'Central location';
  }

  const radiusKm = haversineDistance(
    area.center.lat,
    area.center.lng,
    toNumber(place.location.latitude),
    toNumber(place.location.longitude)
  );

  return `${radiusKm.toFixed(1)} km from centre`;
}

function buildPhotoProxyUrl(baseUrl, photoName, maxWidthPx = 1400, maxHeightPx = 900) {
  return `${baseUrl}/api/properties/photo?name=${encodeURIComponent(photoName)}&maxWidthPx=${maxWidthPx}&maxHeightPx=${maxHeightPx}`;
}

async function fetchGooglePlaces(textQuery, area, pageSize = 10) {
  const cacheKey = JSON.stringify({ textQuery, area: area?.city || null, pageSize });

  if (searchCache.has(cacheKey)) {
    return searchCache.get(cacheKey);
  }

  const body = {
    textQuery,
    pageSize,
  };

  if (area?.center) {
    body.locationBias = {
      circle: {
        center: {
          latitude: area.center.lat,
          longitude: area.center.lng,
        },
        radius: area.setting === 'coastal' ? 45000 : 35000,
      },
    };
  }

  const response = await fetch(GOOGLE_PLACES_SEARCH_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Goog-Api-Key': GOOGLE_PLACES_API_KEY,
      'X-Goog-FieldMask': SEARCH_FIELD_MASK,
    },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    const bodyText = await response.text().catch(() => '');
    throw new Error(`Google Places search failed (${response.status}): ${bodyText}`);
  }

  const payload = await response.json();
  const places = Array.isArray(payload?.places) ? payload.places : [];
  searchCache.set(cacheKey, places);
  return places;
}

function mapGooglePlaceToProperty(place, area, baseUrl) {
  const name = toText(place?.displayName?.text || place?.displayName || place?.formattedAddress || 'Google Maps Stay');
  const rawRating = toNumber(place?.rating, 0);
  const reviewScore = Number(Math.max(0, Math.min(10, rawRating * 2)).toFixed(1));
  const reviewCount = Math.max(0, Math.round(toNumber(place?.userRatingCount, 0)));
  const priceValue = getPriceValue(place?.priceLevel, rawRating);
  const photoName = Array.isArray(place?.photos) && place.photos.length > 0 ? place.photos[0]?.name : '';
  const photoAttribution = Array.isArray(place?.photos) && place.photos.length > 0
    ? toText(place.photos[0]?.authorAttributions?.[0]?.displayName || place.photos[0]?.authorAttributions?.[0]?.uri)
    : '';

  return {
    id: `google-${toText(place?.id || name).toLowerCase()}`,
    title: name,
    category: getCategory(place),
    brand: getBrand(place),
    area: toText(place?.shortFormattedAddress || place?.formattedAddress || area?.city || ''),
    city: area?.city || '',
    province: area?.province || '',
    settingType: area?.setting || '',
    settingLabel: area?.setting === 'coastal' ? 'Coastline property' : 'Inland property',
    coastline: area?.setting === 'coastal',
    distanceLabel: getDistanceLabel(place, area),
    beachLabel: area?.setting === 'coastal' ? 'Near the coast' : 'City stay',
    oldPrice: `ZAR ${Math.round(priceValue + 220).toLocaleString()}`,
    price: `ZAR ${Math.round(priceValue).toLocaleString()}`,
    priceValue,
    reviewScore,
    reviewSummary: getReviewSummary(reviewScore),
    reviewCount,
    valueForMoney: Math.max(6.9, Math.min(9.8, Number((reviewScore - 0.2).toFixed(1)))),
    tag: 'Google Maps result',
    dealTag: place?.businessStatus === 'OPERATIONAL' ? 'Live listing' : 'Google Maps stay',
    unitType: getCategory(place),
    unitDetails: [
      toText(place?.formattedAddress || place?.shortFormattedAddress),
      toText(place?.googleMapsUri || ''),
    ].filter(Boolean),
    freeCancellation: false,
    stars: Math.max(1, Math.min(5, Math.round(rawRating || 4))),
    likes: Math.max(reviewCount, 1),
    imageUrl: photoName ? buildPhotoProxyUrl(baseUrl, photoName) : '',
    photoName,
    photoAttribution,
    googleMapsUri: toText(place?.googleMapsUri),
    location: {
      lat: toNumber(place?.location?.latitude, 0),
      lng: toNumber(place?.location?.longitude, 0),
    },
    amenities: Array.isArray(place?.types) ? place.types.slice(0, 5) : [],
    funThings: area?.setting === 'coastal' ? ['Beach'] : ['City centre'],
    breakfastScore: Math.max(7.1, Math.min(9.6, Number((reviewScore - 0.3).toFixed(1)))),
    veryGoodBreakfast: reviewScore >= 8.4,
    petsAllowed: false,
    adultsOnly: false,
    travelProudLgbtqFriendly: false,
    sustainabilityCertification: false,
    placeId: toText(place?.id),
  };
}

async function getGooglePropertyResults({ area, category, setting, limit = 60, baseUrl, minReviewScore = 0 }) {
  const plans = buildQueryPlans({ area, category, setting });
  const seen = new Map();

  for (const plan of plans) {
    const places = await fetchGooglePlaces(plan.textQuery, plan.area, 10);

    for (const place of places) {
      const key = toText(place?.id);

      if (!key || seen.has(key)) {
        continue;
      }

      seen.set(key, mapGooglePlaceToProperty(place, plan.area, baseUrl));
    }
  }

  return Array.from(seen.values())
    .filter((property) => {
      const score = Number(property?.reviewScore);
      return Number.isFinite(score) ? score >= Number(minReviewScore || 0) : true;
    })
    .slice(0, Math.max(0, Number(limit) || 60));
}

async function getGooglePropertyAreas({ baseUrl, minReviewScore = 0 }) {
  const areas = [];

  for (const blueprint of areaBlueprints) {
    const properties = await getGooglePropertyResults({
      area: blueprint.city,
      limit: blueprint.mapCount,
      baseUrl,
      minReviewScore,
    });

    areas.push({
      city: blueprint.city,
      province: blueprint.province,
      setting: blueprint.setting,
      count: properties.length,
    });
  }

  return areas;
}

function buildThingsToDoQueryPlans(area) {
  const blueprint = getAreaBlueprint(area) || areaBlueprints[0];
  const baseQuery = `${blueprint.city}, ${blueprint.province}, South Africa`;

  return [
    `top attractions in ${baseQuery}`,
    `things to do in ${baseQuery}`,
    `best activities in ${baseQuery}`,
  ].map((textQuery) => ({ textQuery, area: blueprint }));
}

function mapGooglePlaceToThing(place, area, baseUrl) {
  const placeName = toText(place?.displayName?.text || place?.displayName || place?.formattedAddress || 'Local attraction');
  const reviewCount = Math.max(0, Math.round(toNumber(place?.userRatingCount, 0)));
  const rawRating = toNumber(place?.rating, 4.4);
  const rating = Math.max(3.8, Math.min(5, rawRating || 4.4));
  const ratingCount = reviewCount > 0 ? reviewCount : Math.round(260 + (rating * 140));
  const photoName = Array.isArray(place?.photos) && place.photos.length > 0 ? place.photos[0]?.name : '';
  const typeLabel = toText(place?.primaryTypeDisplayName?.text || place?.primaryType || 'Popular attraction');

  return {
    id: `thing-${toText(place?.id || placeName).toLowerCase()}`,
    title: placeName,
    dates: `${typeLabel} in ${area?.city || 'this area'}`,
    count: `${ratingCount.toLocaleString()} recommendations`,
    rating: Number(rating.toFixed(1)),
    imageUrl: photoName ? buildPhotoProxyUrl(baseUrl, photoName, 1200, 760) : '',
    googleMapsUri: toText(place?.googleMapsUri),
    placeId: toText(place?.id),
  };
}

async function getGoogleThingsToDoByArea({ area, baseUrl, limit = 9 }) {
  const plans = buildThingsToDoQueryPlans(area);
  const seen = new Map();

  for (const plan of plans) {
    const places = await fetchGooglePlaces(plan.textQuery, plan.area, 10);

    for (const place of places) {
      const key = toText(place?.id);

      if (!key || seen.has(key)) {
        continue;
      }

      seen.set(key, mapGooglePlaceToThing(place, plan.area, baseUrl));
    }
  }

  const cards = Array.from(seen.values())
    .sort((a, b) => {
      if (b.rating !== a.rating) {
        return b.rating - a.rating;
      }

      return Number((b.count || '').replace(/[^0-9]/g, '')) - Number((a.count || '').replace(/[^0-9]/g, ''));
    })
    .slice(0, Math.max(1, Number(limit) || 9));

  const resolvedArea = plans[0]?.area?.city || toText(area) || 'Cape Town';

  return {
    area: resolvedArea,
    title: `Things to do in ${resolvedArea}`,
    cards,
  };
}

async function getGooglePlacePhotoUri({ name, maxWidthPx, maxHeightPx }) {
  const photoName = String(name || '').trim().replace(/^\/+/, '');
  const query = new URLSearchParams({
    maxWidthPx: String(Math.max(200, maxWidthPx || 1400)),
    maxHeightPx: String(Math.max(200, maxHeightPx || 900)),
    skipHttpRedirect: 'true',
    key: GOOGLE_PLACES_API_KEY,
  });

  const response = await fetch(
    `https://places.googleapis.com/v1/${photoName}/media?${query.toString()}`,
    {
      method: 'GET',
    }
  );

  if (!response.ok) {
    const bodyText = await response.text().catch(() => '');
    throw new Error(`Google Places photo fetch failed (${response.status}): ${bodyText}`);
  }

  const payload = await response.json().catch(() => ({}));
  const photoUri = String(payload?.photoUri || '').trim();

  if (!photoUri) {
    throw new Error('Google Places photo fetch returned no photoUri.');
  }

  return photoUri;
}

module.exports = {
  getGoogleThingsToDoByArea,
  getGooglePlacePhotoUri,
  getGooglePropertyAreas,
  getGooglePropertyResults,
  isGooglePlacesConfigured,
};