const {
  getDeluxePropertyAreas,
  getDeluxePropertyResults,
  getDeluxeThingsToDoByArea,
} = require('../services/deluxePlacesService');
const {
  getLocalGoogleStays,
  getLocalGoogleStayAreas,
  getLocalGoogleThingsToDo,
  isLocalGoogleSnapshotEnabled,
  refreshLocalGoogleSnapshot,
} = require('../services/localGoogleSnapshotService');

const { getGooglePropertyAreas, getGooglePropertyResults, getGoogleThingsToDoByArea, isGooglePlacesConfigured } = require('../services/googlePlacesService');

const ELITE_MIN_REVIEW_SCORE = 8;

function toInteger(value, fallback) {
  const parsed = Number.parseInt(value, 10);
  return Number.isFinite(parsed) && parsed >= 0 ? parsed : fallback;
}

function toReviewScore(value, fallback = ELITE_MIN_REVIEW_SCORE) {
  const parsed = Number.parseFloat(value);

  if (!Number.isFinite(parsed)) {
    return fallback;
  }

  return Math.max(0, Math.min(10, parsed));
}

function toBoolean(value) {
  const normalized = String(value || '').trim().toLowerCase();
  return ['1', 'true', 'yes', 'on', 'y'].includes(normalized);
}

async function getStays(req, res) {
  const { area, category, setting, sort = 'top' } = req.query;
  const limit = toInteger(req.query.limit, 60);
  const offset = toInteger(req.query.offset, 0);
  const minReviewScore = toReviewScore(req.query.minReviewScore, ELITE_MIN_REVIEW_SCORE);
  const forceRefresh = toBoolean(req.query.refresh);
  const baseUrl = `${req.protocol}://${req.get('host')}`;

  if (isLocalGoogleSnapshotEnabled()) {
    try {
      const localSnapshot = await getLocalGoogleStays({
        baseUrl,
        area,
        category,
        setting,
        sort,
        minReviewScore,
        limit,
        offset,
        forceRefresh,
      });

      if (Array.isArray(localSnapshot?.properties) && localSnapshot.properties.length > 0) {
        return res.json(localSnapshot);
      }
    } catch (error) {
      console.error('Local Google snapshot stays lookup failed:', error.message);
    }
  }

  if (!isGooglePlacesConfigured()) {
    const deluxe = getDeluxePropertyResults({
      area,
      category,
      setting,
      sort,
      minReviewScore,
      limit,
      offset,
    });

    return res.json(deluxe);
  }

  try {
    const properties = await getGooglePropertyResults({
      area,
      category,
      setting,
      sort,
      minReviewScore,
      limit: offset + limit,
      baseUrl,
    });

    return res.json({
      source: 'google-places',
      count: properties.length,
      offset,
      limit,
      properties: properties.slice(offset, offset + limit),
    });
  } catch (error) {
    console.error('Google fallback stays lookup failed:', error.message);
    const deluxe = getDeluxePropertyResults({
      area,
      category,
      setting,
      sort,
      minReviewScore,
      limit,
      offset,
    });

    return res.json(deluxe);
  }
}

async function getStayAreas(req, res) {
  const minReviewScore = toReviewScore(req.query.minReviewScore, ELITE_MIN_REVIEW_SCORE);
  const forceRefresh = toBoolean(req.query.refresh);
  const baseUrl = `${req.protocol}://${req.get('host')}`;

  if (isLocalGoogleSnapshotEnabled()) {
    try {
      const localSnapshot = await getLocalGoogleStayAreas({
        baseUrl,
        minReviewScore,
        forceRefresh,
      });

      if (Array.isArray(localSnapshot?.areas) && localSnapshot.areas.length > 0) {
        return res.json(localSnapshot);
      }
    } catch (error) {
      console.error('Local Google snapshot stay areas lookup failed:', error.message);
    }
  }

  if (!isGooglePlacesConfigured()) {
    return res.json(getDeluxePropertyAreas({ minReviewScore }));
  }

  try {
    const areas = await getGooglePropertyAreas({ baseUrl, minReviewScore });

    return res.json({
      source: 'google-places',
      total: areas.reduce((sum, area) => sum + (Number(area.count) || 0), 0),
      areas,
    });
  } catch (error) {
    console.error('Google fallback stay areas lookup failed:', error.message);
    return res.json(getDeluxePropertyAreas({ minReviewScore }));
  }
}

async function getStayThingsToDo(req, res) {
  const { area } = req.query;
  const forceRefresh = toBoolean(req.query.refresh);
  const baseUrl = `${req.protocol}://${req.get('host')}`;

  if (isLocalGoogleSnapshotEnabled()) {
    try {
      const localSnapshot = await getLocalGoogleThingsToDo({
        baseUrl,
        area,
        limit: 9,
        forceRefresh,
      });

      if (Array.isArray(localSnapshot?.thingsToDo?.cards) && localSnapshot.thingsToDo.cards.length > 0) {
        return res.json(localSnapshot);
      }
    } catch (error) {
      console.error('Local Google snapshot things-to-do lookup failed:', error.message);
    }
  }

  if (!isGooglePlacesConfigured()) {
    return res.json(getDeluxeThingsToDoByArea({ area, limit: 9 }));
  }

  try {
    const thingsToDo = await getGoogleThingsToDoByArea({ area, baseUrl, limit: 9 });

    return res.json({
      source: 'google-places',
      area: thingsToDo.area,
      thingsToDo,
    });
  } catch (error) {
    console.error('Google fallback things-to-do lookup failed:', error.message);
    return res.json(getDeluxeThingsToDoByArea({ area, limit: 9 }));
  }
}

async function refreshStaysSnapshot(req, res) {
  if (!isLocalGoogleSnapshotEnabled()) {
    return res.status(400).json({
      message: 'Local Google snapshot service is disabled.',
    });
  }

  const baseUrl = `${req.protocol}://${req.get('host')}`;

  try {
    const summary = await refreshLocalGoogleSnapshot(baseUrl);

    return res.json({
      message: 'Stays snapshot refreshed from Google successfully.',
      ...summary,
    });
  } catch (error) {
    console.error('Stays snapshot refresh failed:', error.message);
    return res.status(502).json({
      message: 'Unable to refresh local Google snapshot at this time.',
      error: error.message,
    });
  }
}

module.exports = {
  getStays,
  getStayAreas,
  getStayThingsToDo,
  refreshStaysSnapshot,
};
