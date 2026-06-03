const fs = require('fs/promises');
const path = require('path');

const { areaBlueprints, toAreaKey } = require('../utils/southAfricaProperties');
const {
  getGooglePropertyResults,
  getGoogleThingsToDoByArea,
  isGooglePlacesConfigured,
} = require('./googlePlacesService');

const SNAPSHOT_MAX_AGE_MS = 1000 * 60 * 60 * 6;
const SNAPSHOT_FILE_PATH = path.join(__dirname, '..', 'cache', 'google-stays-snapshot.json');

let inMemorySnapshot = null;
let refreshPromise = null;

function toNumber(value, fallback = 0) {
  const numeric = Number(value);
  return Number.isFinite(numeric) ? numeric : fallback;
}

function toBool(value) {
  const normalized = String(value || '').trim().toLowerCase();
  return ['1', 'true', 'yes', 'y', 'on'].includes(normalized);
}

function isFresh(snapshot) {
  if (!snapshot?.generatedAt) {
    return false;
  }

  const generatedAt = Number(new Date(snapshot.generatedAt).getTime());

  if (!Number.isFinite(generatedAt) || generatedAt <= 0) {
    return false;
  }

  return Date.now() - generatedAt < SNAPSHOT_MAX_AGE_MS;
}

function dedupeById(items) {
  const seen = new Set();

  return (Array.isArray(items) ? items : []).filter((item) => {
    const id = String(item?.id || '').trim();

    if (!id || seen.has(id)) {
      return false;
    }

    seen.add(id);
    return true;
  });
}

function sortProperties(properties, sort = 'top') {
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

function matchesArea(property, areaQuery) {
  const key = toAreaKey(areaQuery);

  if (!key) {
    return true;
  }

  const content = [
    property?.area,
    property?.city,
    property?.province,
    property?.title,
  ]
    .map((value) => toAreaKey(value))
    .join(' ');

  return content.includes(key);
}

function matchesCategory(property, category) {
  const key = toAreaKey(category);

  if (!key) {
    return true;
  }

  return toAreaKey(property?.category) === key;
}

function matchesSetting(property, setting) {
  const key = toAreaKey(setting);

  if (!key) {
    return true;
  }

  return toAreaKey(property?.settingType) === key || toAreaKey(property?.settingLabel).includes(key);
}

async function persistSnapshot(snapshot) {
  await fs.mkdir(path.dirname(SNAPSHOT_FILE_PATH), { recursive: true });
  await fs.writeFile(SNAPSHOT_FILE_PATH, JSON.stringify(snapshot, null, 2), 'utf8');
}

async function loadSnapshotFromDisk() {
  try {
    const payload = await fs.readFile(SNAPSHOT_FILE_PATH, 'utf8');
    const parsed = JSON.parse(payload);

    if (Array.isArray(parsed?.properties)) {
      return parsed;
    }
  } catch (_error) {
    // Ignore missing or invalid file and continue with live fetch.
  }

  return null;
}

async function buildSnapshot(baseUrl) {
  if (!isGooglePlacesConfigured()) {
    return {
      generatedAt: new Date().toISOString(),
      properties: [],
      thingsToDoByArea: {},
      areaMeta: areaBlueprints.map((area) => ({
        city: area.city,
        province: area.province,
        setting: area.setting,
        count: 0,
      })),
    };
  }

  const allProperties = [];
  const thingsToDoByArea = {};
  const areaMeta = [];

  for (const area of areaBlueprints) {
    const properties = await getGooglePropertyResults({
      area: area.city,
      baseUrl,
      limit: area.mapCount,
      minReviewScore: 0,
    });

    allProperties.push(...properties);

    const thingsToDo = await getGoogleThingsToDoByArea({
      area: area.city,
      baseUrl,
      limit: 12,
    });

    thingsToDoByArea[toAreaKey(area.city)] = thingsToDo;
    areaMeta.push({
      city: area.city,
      province: area.province,
      setting: area.setting,
      count: properties.length,
    });
  }

  return {
    generatedAt: new Date().toISOString(),
    properties: dedupeById(allProperties).map((item) => ({
      ...item,
      sourceTag: 'local-google-snapshot',
    })),
    thingsToDoByArea,
    areaMeta,
  };
}

async function ensureSnapshot(baseUrl, forceRefresh = false) {
  if (!forceRefresh && inMemorySnapshot && isFresh(inMemorySnapshot)) {
    return inMemorySnapshot;
  }

  if (!forceRefresh && !inMemorySnapshot) {
    const fromDisk = await loadSnapshotFromDisk();

    if (fromDisk) {
      inMemorySnapshot = fromDisk;

      if (isFresh(fromDisk)) {
        return inMemorySnapshot;
      }
    }
  }

  if (!refreshPromise) {
    refreshPromise = buildSnapshot(baseUrl)
      .then(async (snapshot) => {
        inMemorySnapshot = snapshot;
        await persistSnapshot(snapshot);
        return snapshot;
      })
      .finally(() => {
        refreshPromise = null;
      });
  }

  return refreshPromise;
}

async function refreshLocalGoogleSnapshot(baseUrl) {
  const snapshot = await ensureSnapshot(baseUrl, true);

  return {
    source: 'local-google-snapshot',
    generatedAt: snapshot?.generatedAt || null,
    properties: Array.isArray(snapshot?.properties) ? snapshot.properties.length : 0,
    thingsToDoAreas: Object.keys(snapshot?.thingsToDoByArea || {}).length,
  };
}

async function getLocalGoogleStays({
  baseUrl,
  area,
  category,
  setting,
  sort = 'top',
  minReviewScore = 0,
  limit = 60,
  offset = 0,
  forceRefresh = false,
}) {
  const snapshot = await ensureSnapshot(baseUrl, forceRefresh);
  const filtered = (Array.isArray(snapshot?.properties) ? snapshot.properties : []).filter((property) => {
    const reviewScore = Number(property?.reviewScore);
    const reviewPass = Number.isFinite(reviewScore) ? reviewScore >= Number(minReviewScore || 0) : true;

    return (
      reviewPass
      && matchesArea(property, area)
      && matchesCategory(property, category)
      && matchesSetting(property, setting)
    );
  });

  const sorted = sortProperties(filtered, sort);

  return {
    source: 'local-google-snapshot',
    generatedAt: snapshot?.generatedAt || null,
    count: sorted.length,
    offset,
    limit,
    properties: sorted.slice(offset, offset + limit),
  };
}

async function getLocalGoogleStayAreas({ baseUrl, minReviewScore = 0, forceRefresh = false }) {
  const snapshot = await ensureSnapshot(baseUrl, forceRefresh);
  const properties = Array.isArray(snapshot?.properties) ? snapshot.properties : [];

  const areas = areaBlueprints.map((area) => {
    const areaKey = toAreaKey(area.city);
    const count = properties.filter((property) => {
      const score = Number(property?.reviewScore);
      const reviewPass = Number.isFinite(score) ? score >= Number(minReviewScore || 0) : true;
      return reviewPass && toAreaKey(property?.city).includes(areaKey);
    }).length;

    return {
      city: area.city,
      province: area.province,
      setting: area.setting,
      count,
    };
  });

  return {
    source: 'local-google-snapshot',
    generatedAt: snapshot?.generatedAt || null,
    total: areas.reduce((sum, item) => sum + (Number(item.count) || 0), 0),
    areas,
  };
}

async function getLocalGoogleThingsToDo({ baseUrl, area, limit = 9, forceRefresh = false }) {
  const snapshot = await ensureSnapshot(baseUrl, forceRefresh);
  const key = toAreaKey(area);
  const fallbackKey = toAreaKey(areaBlueprints?.[0]?.city || 'cape town');
  const thingsMap = snapshot?.thingsToDoByArea || {};

  let selected = thingsMap[key] || null;

  if (!selected && key) {
    const matchingKey = Object.keys(thingsMap).find((candidate) => candidate.includes(key));
    selected = matchingKey ? thingsMap[matchingKey] : null;
  }

  if (!selected) {
    selected = thingsMap[fallbackKey] || {
      area: String(area || '').trim() || 'Cape Town',
      title: 'Things to do',
      cards: [],
    };
  }

  return {
    source: 'local-google-snapshot',
    generatedAt: snapshot?.generatedAt || null,
    area: selected.area,
    thingsToDo: {
      ...selected,
      cards: Array.isArray(selected.cards) ? selected.cards.slice(0, Math.max(1, Number(limit) || 9)) : [],
    },
  };
}

module.exports = {
  getLocalGoogleStays,
  getLocalGoogleStayAreas,
  getLocalGoogleThingsToDo,
  refreshLocalGoogleSnapshot,
  isLocalGoogleSnapshotEnabled: () => toBool(process.env.LOCAL_GOOGLE_SNAPSHOT_ENABLED || 'true'),
};
