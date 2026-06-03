const { SOUTH_AFRICA_PROPERTIES, areaBlueprints } = require('./southAfricaProperties')

const destinationSuggestions = areaBlueprints.map((area) => ({
  name: area.city,
  region: `${area.province}, South Africa`,
}))

const thingCards = areaBlueprints.slice(0, 5).map((area, index) => ({
  id: index + 1,
  title: area.city,
  dates: '14 Dec - 17 Dec, 2 adults',
  count: `${area.mapCount} available`,
}))

const southAfricaCatalogSeed = {
  hero: {
    title: 'Luxury Without\nCompromise',
    subtitle:
      "Showcase your property to the world's most discerning travellers. We do not just list hotels; we curate experiences for a global audience that values quality over quantity.",
    ctaLabel: 'Apply to Join',
  },
  navbar: {
    destinationSuggestions,
  },
  search: {
    breadcrumbs: ['Home', 'South Africa', 'Western Cape', 'Cape Town', 'Search results'],
    heading: 'Cape Town: 48 properties found',
    sortLabel: 'Sort by: Our top picks',
    alertText: '92% of places to stay are currently available for your search. All guest group sizes are welcome.',
    map: {
      label: 'Show on map',
      embedUrl: 'https://www.google.com/maps?q=hotels+in+south+africa&output=embed',
      searchUrl: 'https://www.google.com/maps/search/hotels+in+south+africa',
    },
    properties: SOUTH_AFRICA_PROPERTIES,
  },
  filters: {
    previousFiltersTop: [
      { id: 'guest-houses', label: 'Guest houses', count: 96 },
      { id: 'bed-and-breakfast', label: 'Bed and Breakfast', count: 64 },
      { id: 'apartments', label: 'Apartments', count: 118 },
      { id: 'lodges', label: 'Lodges', count: 74 },
      { id: 'hotels', label: 'Hotels', count: 121 },
    ],
    budget: {
      rangeLabel: 'ZAR 800+ - ZAR 4,000+',
      histogram: [8, 14, 19, 24, 30, 34, 28, 22, 18, 13, 9, 7],
    },
    propertyFilters: [
      { id: 'breakfast-included', label: 'Breakfast included', count: 176 },
      { id: 'superb-9', label: 'Superb: 9+', count: 78 },
      { id: 'very-good-8', label: 'Very good: 8+', count: 204 },
      { id: 'parking', label: 'Parking', count: 242 },
    ],
    reviewScore: [
      { id: 'superb-9-5', label: 'Exceptional: 9.5+', count: 34 },
      { id: 'superb-9', label: 'Superb: 9+', count: 78 },
      { id: 'very-good-8', label: 'Very good: 8+', count: 204 },
      { id: 'good-7', label: 'Good: 7+', count: 266 },
    ],
    beachAccess: [{ id: 'beach-access', label: 'Beach nearby', count: 112 }],
    previousFiltersBottom: [
      { id: 'entire-homes', label: 'Entire homes and apartments', count: 146 },
      { id: 'apartments-bottom', label: 'Apartments', count: 118 },
      { id: 'guest-houses-bottom', label: 'Guest houses', count: 96 },
      { id: 'hotels-bottom', label: 'Hotels', count: 121 },
      { id: 'lodges-bottom', label: 'Lodges', count: 74 },
      { id: 'bed-and-breakfast-bottom', label: 'Bed and Breakfast', count: 64 },
      { id: 'villas-bottom', label: 'Villas', count: 56 },
      { id: 'resorts-bottom', label: 'Resorts', count: 42 },
    ],
    bedroomsBathrooms: {
      bedrooms: 0,
      bathrooms: 0,
    },
    highlyRatedFeatures: [{ id: 'very-good-breakfast', label: 'Very good breakfast', count: 91 }],
    travelGroup: [
      { id: 'pets', label: 'Pets allowed', count: 132 },
      { id: 'adults-only', label: 'Adults only', count: 59 },
      { id: 'travel-proud-lgbtq', label: 'Travel Proud: LGBTQ+ friendly', count: 154 },
    ],
    brands: [
      { id: 'curated-stays', label: 'Curated Stays Collection', count: 61 },
      { id: 'coastal-club', label: 'Coastal Club', count: 38 },
      { id: 'urban-signature', label: 'Urban Signature', count: 43 },
      { id: 'safari-private', label: 'Safari Private Lodges', count: 21 },
      { id: 'protea-marriott', label: 'Protea Hotels by Marriott', count: 18 },
    ],
    funThings: [
      { id: 'beach-fun', label: 'Beach', count: 142 },
      { id: 'golf-fun', label: 'Golf course (within 3 km)', count: 97 },
      { id: 'hiking-fun', label: 'Hiking', count: 121 },
      { id: 'fitness-fun', label: 'Fitness centre', count: 164 },
    ],
    certifications: [{ id: 'sustainability', label: 'Sustainability certification', count: 39 }],
    propertyRating: [
      { id: 'star-3', label: '3 stars', count: 80 },
      { id: 'star-4', label: '4 stars', count: 172 },
      { id: 'star-5', label: '5 stars', count: 88 },
    ],
  },
  thingsToDo: {
    title: 'Where to stay in South Africa',
    cards: thingCards,
  },
  footer: {
    heading: 'Engage with Us in Conversation.',
    description:
      "In a global world based on communication, a premium hospitality brand must look beyond its borders, open up to new experiences, and dare to be different. Meeting the brightest minds of one's time is the most effective way to nurture creativity and trust.",
    imageAlt: 'Luxury villa with a pool',
    columns: [
      {
        title: 'About Us',
        items: ['Our Story', 'Vetting Process', 'Sustainability', 'Careers', 'Contact'],
      },
      {
        title: 'Customer Service',
        items: ['Prices and Payments', 'Booking Policy', 'Return and Cancellation', 'Terms of Service', 'Privacy Policy'],
      },
      {
        title: 'Social Media',
        items: ['Instagram', 'Facebook', 'LinkedIn', 'X (Twitter)'],
      },
    ],
  },
}

module.exports = southAfricaCatalogSeed
