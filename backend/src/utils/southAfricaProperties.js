const areaBlueprints = [
  {
    city: 'Cape Town',
    province: 'Western Cape',
    setting: 'coastal',
    neighborhoods: ['Camps Bay', 'Sea Point', 'Woodstock', 'Green Point', 'Bantry Bay'],
    mapCount: 48,
    center: { lat: -33.9249, lng: 18.4241 },
  },
  {
    city: 'Durban',
    province: 'KwaZulu-Natal',
    setting: 'coastal',
    neighborhoods: ['Umhlanga', 'Morningside', 'North Beach', 'Berea'],
    mapCount: 34,
    center: { lat: -29.8587, lng: 31.0218 },
  },
  {
    city: 'Johannesburg',
    province: 'Gauteng',
    setting: 'inland',
    neighborhoods: ['Sandton', 'Rosebank', 'Melrose', 'Houghton'],
    mapCount: 29,
    center: { lat: -26.2041, lng: 28.0473 },
  },
  {
    city: 'Pretoria',
    province: 'Gauteng',
    setting: 'inland',
    neighborhoods: ['Brooklyn', 'Hatfield', 'Menlyn', 'Arcadia'],
    mapCount: 24,
    center: { lat: -25.7479, lng: 28.2293 },
  },
  {
    city: 'Stellenbosch',
    province: 'Western Cape',
    setting: 'inland',
    neighborhoods: ['Stellenbosch Central', 'De Zalze', 'Paradyskloof'],
    mapCount: 18,
    center: { lat: -33.9321, lng: 18.8602 },
  },
  {
    city: 'Franschhoek',
    province: 'Western Cape',
    setting: 'inland',
    neighborhoods: ['Franschhoek Central', 'La Motte', 'Haute Cabriere'],
    mapCount: 14,
    center: { lat: -33.91, lng: 19.1206 },
  },
  {
    city: 'Gqeberha',
    province: 'Eastern Cape',
    setting: 'coastal',
    neighborhoods: ['Summerstrand', 'Humewood', 'Walmer'],
    mapCount: 17,
    center: { lat: -33.9608, lng: 25.6022 },
  },
  {
    city: 'Knysna',
    province: 'Garden Route',
    setting: 'coastal',
    neighborhoods: ['Knysna Central', 'The Heads', 'Leisure Isle'],
    mapCount: 16,
    center: { lat: -34.0363, lng: 23.0471 },
  },
  {
    city: 'Garden Route',
    province: 'Garden Route',
    setting: 'coastal',
    neighborhoods: ['Plettenberg Bay', 'George', 'Mossel Bay', 'Wilderness'],
    mapCount: 28,
    center: { lat: -34.02, lng: 22.8 },
  },
  {
    city: 'Kruger National Park',
    province: 'Mpumalanga',
    setting: 'inland',
    neighborhoods: ['Skukuza', 'Lower Sabie', 'Satara'],
    mapCount: 12,
    center: { lat: -24.995, lng: 31.5969 },
  },
];

const propertyKinds = [
  { category: 'Entire Home and Apartment', unitType: 'Entire Home and Apartment' },
  { category: 'Apartment', unitType: 'Two-Bedroom Apartment' },
  { category: 'Guest House', unitType: 'Premium Suite' },
  { category: 'Hotel', unitType: 'Deluxe Room' },
  { category: 'Holiday Home', unitType: 'Private Holiday Home' },
  { category: 'Villa', unitType: 'Three-Bedroom Villa' },
  { category: 'Bed and Breakfast', unitType: 'Classic Room' },
  { category: 'Homestay', unitType: 'Homestay Room' },
  { category: 'Hostel', unitType: 'Shared Hostel Room' },
  { category: 'Lodge', unitType: 'Luxury Lodge Suite' },
  { category: 'Chalet', unitType: 'Luxury Chalet' },
  { category: 'Resort', unitType: 'Ocean View Suite' },
  { category: 'Boat', unitType: 'Private Houseboat Cabin' },
  { category: 'Country House', unitType: 'Country House Suite' },
  { category: 'Luxury Tent', unitType: 'Luxury Tent Suite' },
];

const brandDefinitions = [
  { id: 'curated-stays', label: 'Curated Stays Collection' },
  { id: 'coastal-club', label: 'Coastal Club' },
  { id: 'urban-signature', label: 'Urban Signature' },
  { id: 'safari-private', label: 'Safari Private Lodges' },
  { id: 'protea-marriott', label: 'Protea Hotels by Marriott' },
];

const titleAdjectives = [
  'Harbour View',
  'Atlantic Breeze',
  'Jacaranda',
  'Sunset Crest',
  'Azure Dunes',
  'Palm Court',
  'Vineyard Manor',
  'Lagoon Edge',
  'Skyline',
  'Coastal Retreat',
  'City Lights',
  'Mountain Echo',
];

const categoryImageQueryMap = {
  'entire home and apartment': 'house,apartment,interior',
  apartment: 'apartment,interior',
  'guest house': 'house,hotel',
  lodge: 'cabin,lodge',
  villa: 'villa,house,pool',
  resort: 'resort,hotel,pool',
  'bed and breakfast': 'bedroom,house,interior',
};

function buildCategoryImageUrl(category, propertyNumber, variant = 0) {
  const key = String(category || '').trim().toLowerCase();
  const query = categoryImageQueryMap[key] || 'hotel,house,interior';
  const number = Math.max(1, Number(propertyNumber) || 1);
  const variantOffset = Math.max(0, Number(variant) || 0);
  const signature = (number * 11) + variantOffset;
  return `https://loremflickr.com/1400/900/${encodeURIComponent(query)}?lock=${signature}`;
}

function toAreaKey(value) {
  return String(value || '').trim().toLowerCase();
}

function createProperty(area, index, globalIndex) {
  const kind = propertyKinds[(index + globalIndex) % propertyKinds.length];
  const neighborhood = area.neighborhoods[index % area.neighborhoods.length];
  const adjective = titleAdjectives[(globalIndex + index) % titleAdjectives.length];
  const basePrice = 920 + ((globalIndex * 137) % 2900);
  const reviewScore = Number((7.9 + ((globalIndex % 17) / 10)).toFixed(1));
  const reviewSummary = reviewScore >= 9 ? 'Superb' : reviewScore >= 8.3 ? 'Very good' : 'Good';
  const reviewCount = 90 + ((globalIndex * 41) % 2100);
  const stars = 1 + (globalIndex % 5);
  const propertyNumber = globalIndex + 1;
  const propertyId = `sa-${propertyNumber}`;
  const imageId = `sa-image-${propertyNumber}`;
  const imageUrl = buildCategoryImageUrl(kind.category, propertyNumber);
  const brand = brandDefinitions[globalIndex % brandDefinitions.length];
  const petsAllowed = globalIndex % 4 === 0;
  const adultsOnly = globalIndex % 6 === 0;
  const travelProudLgbtqFriendly = globalIndex % 3 === 0;
  const sustainabilityCertification = globalIndex % 5 === 0;
  const breakfastScore = Number((7.3 + ((globalIndex % 10) / 5)).toFixed(1));
  const veryGoodBreakfast = breakfastScore >= 8.4;
  const funThings = ['Fitness centre'];

  if (area.setting === 'coastal') {
    funThings.push('Beach');
  }

  if (globalIndex % 4 === 0) {
    funThings.push('Golf course (within 3 km)');
  }

  if (globalIndex % 2 === 0) {
    funThings.push('Hiking');
  }

  if (globalIndex % 3 === 0) {
    funThings.push('Cycling');
  }

  const amenities = ['Wi-Fi', 'Pool', 'Parking', 'Breakfast'];

  if (petsAllowed) {
    amenities.push('Pets allowed', 'Pet friendly');
  }

  if (adultsOnly) {
    amenities.push('Adults only');
  }

  if (travelProudLgbtqFriendly) {
    amenities.push('Travel Proud', 'LGBTQ+ friendly');
  }

  if (sustainabilityCertification) {
    amenities.push('Sustainability certification');
  }

  return {
    id: propertyId,
    title: `${adjective} ${area.city} ${kind.category}`,
    category: kind.category,
    brandId: brand.id,
    brand: brand.label,
    area: `${neighborhood}, ${area.city}`,
    city: area.city,
    province: area.province,
    settingType: area.setting,
    settingLabel: area.setting === 'coastal' ? 'Coastline property' : 'Inland property',
    coastline: area.setting === 'coastal',
    distanceLabel: `${(0.6 + ((index * 1.3) % 9)).toFixed(1)} km from centre`,
    beachLabel: area.city === 'Johannesburg' || area.city === 'Pretoria' ? 'City stay' : `${120 + ((index * 85) % 850)} m from beach`,
    oldPrice: `ZAR ${(basePrice + 260).toLocaleString()}`,
    price: `ZAR ${basePrice.toLocaleString()}`,
    reviewScore,
    reviewSummary,
    reviewCount,
    valueForMoney: Number((7.8 + ((globalIndex % 14) / 10)).toFixed(1)),
    tag: index % 3 === 0 ? 'Guest favourite' : index % 3 === 1 ? 'Top rated stay' : 'Popular choice',
    dealTag: index % 2 === 0 ? 'Smart Deal' : 'Limited-time Offer',
    unitType: kind.unitType,
    unitDetails: [
      `${kind.unitType} with private bathroom and fast Wi-Fi`,
      `${1 + (index % 3)} bed${index % 3 === 0 ? '' : 's'} and workspace`,
    ],
    freeCancellation: index % 5 !== 0,
    stars,
    likes: 120 + ((globalIndex * 29) % 2400),
    imageId,
    imageUrl,
    gallery: [
      buildCategoryImageUrl(kind.category, propertyNumber, 1),
      buildCategoryImageUrl(kind.category, propertyNumber, 2),
      buildCategoryImageUrl(kind.category, propertyNumber, 3),
    ],
    location: {
      lat: Number((area.center.lat + ((index % 5) - 2) * 0.012).toFixed(6)),
      lng: Number((area.center.lng + ((index % 5) - 2) * 0.013).toFixed(6)),
    },
    amenities,
    funThings,
    breakfastScore,
    veryGoodBreakfast,
    petsAllowed,
    adultsOnly,
    travelProudLgbtqFriendly,
    sustainabilityCertification,
  };
}

const SOUTH_AFRICA_PROPERTIES = areaBlueprints.flatMap((area, areaIndex) => {
  return Array.from({ length: area.mapCount }, (_, index) => {
    const globalIndex = areaIndex * 100 + index;
    return createProperty(area, index, globalIndex);
  });
});

const areaCountMap = areaBlueprints.reduce((acc, area) => {
  acc[toAreaKey(area.city)] = area.mapCount;
  return acc;
}, {});

function filterProperties({ area, category, setting }) {
  const areaKey = toAreaKey(area);
  const categoryKey = toAreaKey(category);
  const settingKey = toAreaKey(setting);

  return SOUTH_AFRICA_PROPERTIES.filter((property) => {
    const matchesArea = !areaKey
      || toAreaKey(property.city).includes(areaKey)
      || toAreaKey(property.area).includes(areaKey)
      || toAreaKey(property.province).includes(areaKey);

    const matchesCategory = !categoryKey || toAreaKey(property.category) === categoryKey;
    const matchesSetting = !settingKey
      || toAreaKey(property.settingType) === settingKey
      || toAreaKey(property.settingLabel).includes(settingKey);

    return matchesArea && matchesCategory && matchesSetting;
  });
}

module.exports = {
  SOUTH_AFRICA_PROPERTIES,
  areaCountMap,
  areaBlueprints,
  filterProperties,
  toAreaKey,
};
