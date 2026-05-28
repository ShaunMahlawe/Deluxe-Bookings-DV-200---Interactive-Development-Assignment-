const { areaBlueprints, filterProperties } = require('../utils/southAfricaProperties');
const { getThingsToDoByArea } = require('../utils/southAfricaThingsToDo');

function isDeluxePlacesConfigured() {
  const value = String(process.env.DELUXE_API_ENABLED || 'true').trim().toLowerCase();
  return !['0', 'false', 'off', 'no'].includes(value);
}

function toNumber(value, fallback = 0) {
  const numeric = Number(value);
  return Number.isFinite(numeric) ? numeric : fallback;
}

function sortProperties(properties, sort = 'top') {
  if (!Array.isArray(properties) || properties.length === 0) {
    return [];
  }

  if (sort === 'price-low') {
    return [...properties].sort((a, b) => toNumber(a?.priceValue) - toNumber(b?.priceValue));
  }

  if (sort === 'price-high') {
    return [...properties].sort((a, b) => toNumber(b?.priceValue) - toNumber(a?.priceValue));
  }

  if (sort === 'rating') {
    return [...properties].sort((a, b) => toNumber(b?.reviewScore) - toNumber(a?.reviewScore));
  }

  if (sort === 'likes') {
    return [...properties].sort((a, b) => toNumber(b?.likes) - toNumber(a?.likes));
  }

  return [...properties].sort((a, b) => {
    const ratingDiff = toNumber(b?.reviewScore) - toNumber(a?.reviewScore);

    if (ratingDiff !== 0) {
      return ratingDiff;
    }

    return toNumber(b?.likes) - toNumber(a?.likes);
  });
}

function getDeluxePropertyResults({ area, category, setting, sort = 'top', minReviewScore = 0, limit = 60, offset = 0 }) {
  const filtered = filterProperties({ area, category, setting })
    .filter((property) => {
      const score = Number(property?.reviewScore);
      return Number.isFinite(score) ? score >= Number(minReviewScore || 0) : true;
    })
    .map((property) => ({
      ...property,
      sourceTag: 'deluxe-api',
    }));

  const sorted = sortProperties(filtered, sort);
  const paged = sorted.slice(offset, offset + limit);

  return {
    source: 'deluxe-api',
    count: sorted.length,
    offset,
    limit,
    properties: paged,
  };
}

function getDeluxePropertyAreas({ minReviewScore = 0 }) {
  const areas = areaBlueprints.map((area) => {
    const count = filterProperties({ area: area.city }).filter((property) => {
      const score = Number(property?.reviewScore);
      return Number.isFinite(score) ? score >= Number(minReviewScore || 0) : true;
    }).length;

    return {
      city: area.city,
      province: area.province,
      setting: area.setting,
      count,
    };
  });

  return {
    source: 'deluxe-api',
    total: areas.reduce((sum, item) => sum + (Number(item.count) || 0), 0),
    areas,
  };
}

function getDeluxeThingsToDoByArea({ area, limit = 9 }) {
  const payload = getThingsToDoByArea(area);
  const cards = Array.isArray(payload?.cards) ? payload.cards.slice(0, Math.max(1, Number(limit) || 9)) : [];

  return {
    source: 'deluxe-api',
    area: payload?.area || String(area || '').trim() || 'Cape Town',
    thingsToDo: {
      ...(payload || {}),
      cards,
    },
  };
}

module.exports = {
  getDeluxePropertyAreas,
  getDeluxePropertyResults,
  getDeluxeThingsToDoByArea,
  isDeluxePlacesConfigured,
};
