import './App.css';
import { useEffect, useMemo, useState } from 'react';
import SearchResultsPage from './components/common/searchResults.jsx';
import HeroHeader from './components/common/heroheader.jsx';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5001';
const ELITE_MIN_REVIEW_SCORE = 8;

const defaultSearchCriteria = {
  destination: 'Cape Town',
  checkInDate: '2026-12-14',
  checkOutDate: '2026-12-17',
  guestCounts: {
    adults: 2,
    children: 0,
    rooms: 1,
  },
};

const locationRegion = {
  'cape town': 'Western Cape',
  durban: 'KwaZulu-Natal',
  johannesburg: 'Gauteng',
  pretoria: 'Gauteng',
  stellenbosch: 'Western Cape',
  franschhoek: 'Western Cape',
  gqeberha: 'Eastern Cape',
  knysna: 'Garden Route',
  'garden route': 'Garden Route',
  'kruger national park': 'Mpumalanga',
};

function toTitleCase(value) {
  return String(value || '')
    .trim()
    .toLowerCase()
    .split(/\s+/)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

function formatStayDate(value) {
  if (!value) {
    return '';
  }

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return String(value);
  }

  return new Intl.DateTimeFormat('en-ZA', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  }).format(date);
}

function getStayNights(criteria) {
  const checkIn = new Date(criteria?.checkInDate || defaultSearchCriteria.checkInDate);
  const checkOut = new Date(criteria?.checkOutDate || defaultSearchCriteria.checkOutDate);

  if (Number.isNaN(checkIn.getTime()) || Number.isNaN(checkOut.getTime())) {
    return 1;
  }

  const diffMs = checkOut.getTime() - checkIn.getTime();
  const nights = Math.round(diffMs / (24 * 60 * 60 * 1000));
  return Number.isFinite(nights) && nights > 0 ? nights : 1;
}

function estimateAvailabilityPercentage(matchedCount) {
  const boostFromMatches = Math.min(8, Math.max(0, matchedCount) * 2);
  const percentage = 89 + boostFromMatches;
  return Math.min(97, Math.max(86, percentage));
}

function getMapQuery(location) {
  const destination = String(location || '').trim();
  return destination || 'cape town';
}

function dedupeProperties(items) {
  const seen = new Set();

  return (Array.isArray(items) ? items : []).filter((property) => {
    const idKey = String(property?.id || '').trim().toLowerCase();
    const signatureKey = [
      String(property?.title || '').trim().toLowerCase(),
      String(property?.area || '').trim().toLowerCase(),
      String(property?.price || '').trim().toLowerCase(),
    ].join('|');
    const key = idKey || signatureKey;

    if (!key || seen.has(key)) {
      return false;
    }

    seen.add(key);
    return true;
  });
}

function buildSearchData(baseSearchData, criteria, propertySearchResult, propertyTotals, fullPropertyPool) {
  if (!baseSearchData) {
    return null;
  }

  const destinationRaw = String(criteria?.destination || defaultSearchCriteria.destination).trim();
  const destination = destinationRaw || defaultSearchCriteria.destination;
  const destinationLower = destination.toLowerCase();
  const catalogProperties = Array.isArray(baseSearchData.properties) ? baseSearchData.properties : [];
  const apiProperties = Array.isArray(propertySearchResult?.properties) ? propertySearchResult.properties : [];
  const properties = dedupeProperties(apiProperties.length > 0 ? apiProperties : catalogProperties);

  const matched = properties.filter((property) => {
    const content = `${property.title || ''} ${property.area || ''}`.toLowerCase();
    return content.includes(destinationLower);
  });

  const fallbackMatches = properties.filter((property) => {
    const cityToken = String(property.area || '').split(',').pop()?.trim()?.toLowerCase() || '';
    return cityToken === destinationLower;
  });

  const provinceMatches = properties.filter((property) => String(property.province || '').toLowerCase().includes(destinationLower));

  const filteredProperties = matched.length > 0
    ? matched
    : fallbackMatches.length > 0
      ? fallbackMatches
      : provinceMatches.length > 0
        ? provinceMatches
        : properties;
  const region = locationRegion[destinationLower] || 'South Africa';
  const uniqueFilteredProperties = dedupeProperties(filteredProperties);
  const apiCount = Number(propertySearchResult?.count);
  const fullPoolCount = Number(fullPropertyPool?.count);
  const fullPoolProperties = dedupeProperties(fullPropertyPool?.properties || []);
  const apiTotal = Number(propertyTotals?.total);
  const count = fullPoolCount > 0 ? fullPoolCount : apiTotal > 0 ? apiTotal : apiCount > 0 ? apiCount : uniqueFilteredProperties.length;
  const mapQuery = getMapQuery(destination);
  const availabilityPercentage = estimateAvailabilityPercentage(count);
  const unavailablePercentage = Math.max(0, 100 - availabilityPercentage);
  const checkInLabel = formatStayDate(criteria?.checkInDate || defaultSearchCriteria.checkInDate);
  const checkOutLabel = formatStayDate(criteria?.checkOutDate || defaultSearchCriteria.checkOutDate);
  const stayNights = getStayNights(criteria);
  const stayLabel = checkInLabel && checkOutLabel ? `${checkInLabel} to ${checkOutLabel}` : 'your selected dates';

  return {
    ...baseSearchData,
    breadcrumbs: ['Home', 'South Africa', region, toTitleCase(destination), 'Search results'],
    heading: `${toTitleCase(destination)}: ${count.toLocaleString()} properties found`,
    map: {
      label: 'Show on map',
      embedUrl: `https://www.google.com/maps?q=hotels+in+${encodeURIComponent(mapQuery)}&output=embed`,
      searchUrl: `https://www.google.com/maps/search/hotels+in+${encodeURIComponent(mapQuery)}`,
    },
    alertText: `${unavailablePercentage}% of places to stay are unavailable for ${stayLabel}. ${availabilityPercentage}% remain available for your search.`,
    totalPropertiesFound: count,
    stayNights,
    propertySettingTotals: propertyTotals,
    filterSourceProperties: fullPoolProperties.length > 0 ? fullPoolProperties : uniqueFilteredProperties,
    properties: uniqueFilteredProperties,
  };
}

function buildThingsToDoData(baseThingsToDoData, areaThingsToDoResult) {
  if (areaThingsToDoResult?.title && Array.isArray(areaThingsToDoResult?.cards)) {
    return areaThingsToDoResult;
  }

  return baseThingsToDoData || null;
}

function App({ apiMode = 'stays' }) {
  const [catalog, setCatalog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  const [searchCriteria, setSearchCriteria] = useState(defaultSearchCriteria);
  const [propertySearchResult, setPropertySearchResult] = useState({
    source: '',
    count: 0,
    properties: [],
  });
  const [thingsToDoResult, setThingsToDoResult] = useState(null);
  const [propertiesLoading, setPropertiesLoading] = useState(false);
  const [propertyTotals, setPropertyTotals] = useState({
    coastal: 0,
    inland: 0,
    total: 0,
  });
  const [fullPropertyPool, setFullPropertyPool] = useState({
    count: 0,
    properties: [],
  });
  const [refreshTick, setRefreshTick] = useState(0);
  const [refreshingLiveData, setRefreshingLiveData] = useState(false);
  const [refreshStatusMessage, setRefreshStatusMessage] = useState('');

  const isAdminRefreshEnabled = useMemo(() => {
    if (apiMode !== 'stays') {
      return false;
    }

    const envEnabled = String(import.meta.env.VITE_ENABLE_ADMIN_REFRESH || '').trim().toLowerCase();

    if (['1', 'true', 'yes', 'on'].includes(envEnabled)) {
      return true;
    }

    const params = new URLSearchParams(window.location.search);
    return params.get('admin') === '1';
  }, [apiMode]);

  useEffect(() => {
    let mounted = true;

    async function loadCatalog() {
      try {
        const response = await fetch(`${API_BASE_URL}/api/catalog`);

        if (!response.ok) {
          throw new Error('Failed to load catalog data.');
        }

        const payload = await response.json();

        if (mounted) {
          setCatalog(payload.catalog || null);
          setErrorMessage('');
        }
      } catch (error) {
        if (mounted) {
          setErrorMessage(error.message || 'Unable to load catalog data.');
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    }

    loadCatalog();

    return () => {
      mounted = false;
    };
  }, []);

  useEffect(() => {
    let mounted = true;
    const staysApiBase = apiMode === 'stays' ? '/api/stays' : '/api/properties';

    async function loadPropertiesForArea() {
      const destination = String(searchCriteria?.destination || defaultSearchCriteria.destination).trim();
      const area = destination || defaultSearchCriteria.destination;

      setPropertiesLoading(true);

      try {
        const query = new URLSearchParams({
          area,
          limit: '300',
          offset: '0',
          minReviewScore: String(ELITE_MIN_REVIEW_SCORE),
        });

        if (apiMode === 'stays' && refreshTick > 0) {
          query.set('refresh', 'true');
        }

        const response = await fetch(`${API_BASE_URL}${staysApiBase}?${query.toString()}`);

        if (!response.ok) {
          throw new Error('Failed to load properties for the selected area.');
        }

        const payload = await response.json();

        if (mounted) {
          setPropertySearchResult({
            source: String(payload?.source || ''),
            count: Number.isFinite(payload?.count) ? payload.count : 0,
            properties: Array.isArray(payload?.properties) ? payload.properties : [],
          });
        }
      } catch (_error) {
        if (mounted) {
          setPropertySearchResult({
            source: '',
            count: 0,
            properties: [],
          });
        }
      } finally {
        if (mounted) {
          setPropertiesLoading(false);
        }
      }
    }

    loadPropertiesForArea();

    return () => {
      mounted = false;
    };
  }, [apiMode, refreshTick, searchCriteria.destination]);

  useEffect(() => {
    let mounted = true;
    const staysApiBase = apiMode === 'stays' ? '/api/stays' : '/api/properties';

    async function loadFullPropertyPool() {
      try {
        const query = new URLSearchParams({
          limit: '1000',
          offset: '0',
          minReviewScore: String(ELITE_MIN_REVIEW_SCORE),
        });

        if (apiMode === 'stays' && refreshTick > 0) {
          query.set('refresh', 'true');
        }

        const response = await fetch(`${API_BASE_URL}${staysApiBase}?${query.toString()}`);

        if (!response.ok) {
          throw new Error('Failed to load full property pool.');
        }

        const payload = await response.json();

        if (mounted) {
          setFullPropertyPool({
            count: Number.isFinite(payload?.count) ? payload.count : 0,
            properties: Array.isArray(payload?.properties) ? payload.properties : [],
          });
        }
      } catch (_error) {
        if (mounted) {
          setFullPropertyPool({
            count: 0,
            properties: [],
          });
        }
      }
    }

    loadFullPropertyPool();

    return () => {
      mounted = false;
    };
  }, [apiMode, refreshTick]);

  useEffect(() => {
    let mounted = true;
    const areasApi = apiMode === 'stays' ? '/api/stays/areas' : '/api/properties/areas';

    async function loadPropertySettingTotals() {
      try {
        const query = new URLSearchParams({
          minReviewScore: String(ELITE_MIN_REVIEW_SCORE),
        });

        if (apiMode === 'stays' && refreshTick > 0) {
          query.set('refresh', 'true');
        }

        const response = await fetch(
          `${API_BASE_URL}${areasApi}?${query.toString()}`
        );

        if (!response.ok) {
          throw new Error('Failed to load property area totals.');
        }

        const payload = await response.json();
        const areas = Array.isArray(payload?.areas) ? payload.areas : [];
        const totals = areas.reduce(
          (accumulator, area) => {
            const count = Number(area?.count) || 0;
            const setting = String(area?.setting || '').toLowerCase();

            if (setting === 'coastal') {
              accumulator.coastal += count;
            } else if (setting === 'inland') {
              accumulator.inland += count;
            }

            return accumulator;
          },
          { coastal: 0, inland: 0 }
        );

        if (mounted) {
          setPropertyTotals({
            coastal: totals.coastal,
            inland: totals.inland,
            total: totals.coastal + totals.inland,
          });
        }
      } catch (_error) {
        if (mounted) {
          setPropertyTotals({
            coastal: 0,
            inland: 0,
            total: 0,
          });
        }
      }
    }

    loadPropertySettingTotals();

    return () => {
      mounted = false;
    };
  }, [apiMode, refreshTick]);

  useEffect(() => {
    let mounted = true;
    const thingsApi = apiMode === 'stays' ? '/api/stays/things-to-do' : '/api/things-to-do';

    async function loadThingsToDoForArea() {
      const destination = String(searchCriteria?.destination || defaultSearchCriteria.destination).trim();
      const area = destination || defaultSearchCriteria.destination;

      try {
        const query = new URLSearchParams({ area });

        if (apiMode === 'stays' && refreshTick > 0) {
          query.set('refresh', 'true');
        }

        const response = await fetch(`${API_BASE_URL}${thingsApi}?${query.toString()}`);

        if (!response.ok) {
          throw new Error('Failed to load things to do for the selected area.');
        }

        const payload = await response.json();

        if (mounted) {
          setThingsToDoResult(payload?.thingsToDo || null);
        }
      } catch (_error) {
        if (mounted) {
          setThingsToDoResult(null);
        }
      }
    }

    loadThingsToDoForArea();

    return () => {
      mounted = false;
    };
  }, [apiMode, refreshTick, searchCriteria.destination]);

  const resolvedSearchData = useMemo(
    () => buildSearchData(catalog?.search, searchCriteria, propertySearchResult, propertyTotals, fullPropertyPool),
    [catalog?.search, searchCriteria, propertySearchResult, propertyTotals, fullPropertyPool]
  );

  const resolvedThingsToDoData = useMemo(
    () => buildThingsToDoData(catalog?.thingsToDo, thingsToDoResult),
    [catalog?.thingsToDo, thingsToDoResult]
  );

  const handleSearchSubmit = (nextSearchCriteria) => {
    setSearchCriteria((current) => ({
      ...current,
      ...nextSearchCriteria,
      guestCounts: {
        ...current.guestCounts,
        ...(nextSearchCriteria?.guestCounts || {}),
      },
    }));
  };

  const handleRefreshLiveData = async () => {
    if (!isAdminRefreshEnabled || refreshingLiveData) {
      return;
    }

    setRefreshingLiveData(true);
    setRefreshStatusMessage('Refreshing live Google data...');

    try {
      const response = await fetch(`${API_BASE_URL}/api/stays/refresh`, {
        method: 'POST',
      });

      const payload = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(payload?.message || 'Refresh request failed.');
      }

      setRefreshTick((current) => current + 1);
      setRefreshStatusMessage(payload?.message || 'Live data refreshed.');
    } catch (error) {
      setRefreshStatusMessage(error.message || 'Unable to refresh live data.');
    } finally {
      setRefreshingLiveData(false);
    }
  };

  return (
    <>
      <HeroHeader
        heroData={catalog?.hero}
        navbarData={catalog?.navbar}
        onSearchSubmit={handleSearchSubmit}
        canRefreshLiveData={isAdminRefreshEnabled}
        onRefreshLiveData={handleRefreshLiveData}
        refreshingLiveData={refreshingLiveData}
      />
      <main className="App">
        {loading ? <p className="app-status-message">Loading hospitality listings...</p> : null}
        {propertiesLoading ? <p className="app-status-message">Refreshing area properties...</p> : null}
        {refreshStatusMessage ? <p className="app-status-message">{refreshStatusMessage}</p> : null}
        {errorMessage ? <p className="app-status-message">{errorMessage}</p> : null}
        <SearchResultsPage
          searchData={resolvedSearchData}
          filterData={catalog?.filters}
          thingsToDoData={resolvedThingsToDoData}
          footerData={catalog?.footer}
        />
      </main>
    </>
  );
}

export default App;
