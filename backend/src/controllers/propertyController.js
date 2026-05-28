const { SOUTH_AFRICA_PROPERTIES, areaBlueprints, filterProperties } = require('../utils/southAfricaProperties');
const {
  getDeluxePropertyAreas,
  getDeluxePropertyResults,
  isDeluxePlacesConfigured,
} = require('../services/deluxePlacesService');
const {
  getGooglePlacePhotoUri,
  getGooglePropertyAreas,
  getGooglePropertyResults,
  isGooglePlacesConfigured,
} = require('../services/googlePlacesService');

const ELITE_MIN_REVIEW_SCORE = 8;

function toInteger(value, fallback) {
  const parsed = Number.parseInt(value, 10);
  return Number.isFinite(parsed) && parsed >= 0 ? parsed : fallback;
}

function toReviewScore(value, fallback) {
  const parsed = Number.parseFloat(value);
  if (!Number.isFinite(parsed)) {
    return Math.max(ELITE_MIN_REVIEW_SCORE, fallback);
  }

  return Math.max(ELITE_MIN_REVIEW_SCORE, Math.min(10, parsed));
}

async function getProperties(req, res) {
  const { area, category, setting, sort = 'top' } = req.query;
  const limit = toInteger(req.query.limit, 60);
  const offset = toInteger(req.query.offset, 0);
  const minReviewScore = toReviewScore(req.query.minReviewScore, ELITE_MIN_REVIEW_SCORE);

  const baseUrl = `${req.protocol}://${req.get('host')}`;
  let properties = [];
  let source = 'seed-generated';

  if (isDeluxePlacesConfigured()) {
    try {
      const deluxeResults = getDeluxePropertyResults({
        area,
        category,
        setting,
        sort,
        minReviewScore,
        limit: offset + limit,
        offset: 0,
      });

      properties = Array.isArray(deluxeResults?.properties) ? deluxeResults.properties : [];
      source = 'deluxe-api';
    } catch (error) {
      console.error('Deluxe API property lookup failed:', error.message);
    }
  }

  if (properties.length === 0 && isGooglePlacesConfigured()) {
    try {
      properties = await getGooglePropertyResults({
        area,
        category,
        setting,
        limit: offset + limit,
        baseUrl,
        minReviewScore,
      });
      source = 'google-places';
    } catch (error) {
      console.error('Google Places property lookup failed:', error.message);
    }
  }

  if (properties.length === 0) {
    properties = filterProperties({ area, category, setting });
    source = 'seed-generated';
  }

  properties = properties.filter((property) => {
    const score = Number(property?.reviewScore);
    return Number.isFinite(score) ? score >= minReviewScore : true;
  });

  if (sort === 'price-low') {
    properties = [...properties].sort((a, b) => Number(a.priceValue || a.price.replace(/[^0-9]/g, '')) - Number(b.priceValue || b.price.replace(/[^0-9]/g, '')));
  } else if (sort === 'price-high') {
    properties = [...properties].sort((a, b) => Number(b.priceValue || b.price.replace(/[^0-9]/g, '')) - Number(a.priceValue || a.price.replace(/[^0-9]/g, '')));
  } else if (sort === 'rating') {
    properties = [...properties].sort((a, b) => b.reviewScore - a.reviewScore);
  } else if (sort === 'likes') {
    properties = [...properties].sort((a, b) => b.likes - a.likes);
  }

  const paged = properties.slice(offset, offset + limit);

  return res.json({
    source,
    count: properties.length,
    offset,
    limit,
    properties: paged,
  });
}

async function getPropertyAreas(req, res) {
  const baseUrl = `${req.protocol}://${req.get('host')}`;
  const minReviewScore = toReviewScore(req.query.minReviewScore, ELITE_MIN_REVIEW_SCORE);

  if (isDeluxePlacesConfigured()) {
    try {
      const deluxeAreas = getDeluxePropertyAreas({ minReviewScore });

      if (Array.isArray(deluxeAreas?.areas) && deluxeAreas.areas.length > 0) {
        return res.json(deluxeAreas);
      }
    } catch (error) {
      console.error('Deluxe API area lookup failed:', error.message);
    }
  }

  if (isGooglePlacesConfigured()) {
    try {
      const areas = await getGooglePropertyAreas({ baseUrl, minReviewScore });

      return res.json({
        source: 'google-places',
        total: areas.reduce((sum, area) => sum + (Number(area.count) || 0), 0),
        areas,
      });
    } catch (error) {
      console.error('Google Places area lookup failed:', error.message);
    }
  }

  const areas = areaBlueprints.map((area) => ({
    count: SOUTH_AFRICA_PROPERTIES.filter((property) => {
      const isAreaMatch = String(property?.city || '').toLowerCase() === String(area.city).toLowerCase();
      const score = Number(property?.reviewScore);
      return isAreaMatch && (Number.isFinite(score) ? score >= minReviewScore : true);
    }).length,
    city: area.city,
    province: area.province,
    setting: area.setting,
  }));

  return res.json({
    source: 'seed-generated',
    total: areas.reduce((sum, area) => sum + (Number(area.count) || 0), 0),
    areas,
  });
}

async function getPropertyPhoto(req, res) {
  const { name } = req.query;

  if (!name) {
    return res.status(400).json({ error: 'Missing photo name.' });
  }

  if (!isGooglePlacesConfigured()) {
    return res.status(503).json({ error: 'Google Places is not configured.' });
  }

  try {
    const photoUri = await getGooglePlacePhotoUri({
      name: String(name),
      maxWidthPx: toInteger(req.query.maxWidthPx, 1400),
      maxHeightPx: toInteger(req.query.maxHeightPx, 900),
    });

    res.setHeader('Cache-Control', 'public, max-age=3600');
    return res.redirect(photoUri);
  } catch (error) {
    console.error('Google Places photo lookup failed:', error.message);
    return res.status(502).json({ error: 'Unable to load property photo.' });
  }
}

module.exports = {
  getProperties,
  getPropertyAreas,
  getPropertyPhoto,
};
