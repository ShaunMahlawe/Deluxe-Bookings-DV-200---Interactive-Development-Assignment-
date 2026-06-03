const { areaBlueprints, toAreaKey } = require('./southAfricaProperties');

const areaActivities = {
  'cape town': [
    'Table Mountain Cableway or Platteklip Gorge Hike',
    'Lion\'s Head Sunrise or Sunset Hike',
    'Cape Point and Cape of Good Hope',
    'Chapman\'s Peak Drive',
    'Kirstenbosch Botanical Gardens and Canopy Walkway',
    'Boulders Beach Penguin Colony',
    'Franschhoek Wine Tram Experience',
    'Stellenbosch Wine Estates',
    'Time Out Market Cape Town and Waterfront Seafood',
    'Bo-Kaap Cape Malay Heritage Walk',
    'District Six Museum Visit',
    'Robben Island Historic Tour',
    'Castle of Good Hope',
    'Zeitz MOCAA at the V&A Waterfront',
    'Clifton Beaches',
    'Camps Bay Beachfront',
    'Muizenberg Surf and Beach Huts',
    'Bloubergstrand Table Mountain Viewpoint',
    'Paragliding from Signal Hill',
    'Table Mountain Abseiling',
    'Shark Cage Diving in Gansbaai',
    'Ziplining in Elgin',
    'Seal Island Boat Trip from Hout Bay',
    'Cape Point Ostrich Farm',
    'Whale Watching in Hermanus (Seasonal)',
  ],
  durban: [
    'uShaka Marine World',
    'Golden Mile Beachfront',
    'Moses Mabhida SkyCar',
    'Durban Botanic Gardens',
    'Inanda Heritage Route',
    'Umhlanga Lighthouse Walk',
    'Florida Road Food Strip',
    'Durban Natural Science Museum',
    'Valley of a Thousand Hills Tour',
  ],
  johannesburg: [
    'Apartheid Museum',
    'Maboneng District',
    'Constitution Hill',
    'Gold Reef City',
    'Cradle of Humankind Day Trip',
    'Johannesburg Art Gallery',
    'Nelson Mandela Square',
    'Soweto Cultural Tour',
    'Johannesburg Zoo',
  ],
  pretoria: [
    'Union Buildings Gardens',
    'Voortrekker Monument',
    'Freedom Park',
    'National Zoological Garden',
    'Jacaranda City Drive',
    'Hazel Food Market',
    'Church Square Heritage Walk',
    'Rietvlei Nature Reserve',
    'Ditsong National Museum',
  ],
  stellenbosch: [
    'Winelands Tasting Route',
    'Jonkershoek Nature Reserve',
    'Stellenbosch Village Museum',
    'Wine Tram Excursions',
    'Dorp Street Walk',
    'Art Galleries Circuit',
    'Spier Wine Farm Visit',
    'Blaauwklippen Market',
    'Helshoogte Pass Scenic Drive',
  ],
  franschhoek: [
    'Franschhoek Wine Tram',
    'Huguenot Memorial Museum',
    'Mont Rochelle Nature Trail',
    'Boutique Cellar Tours',
    'Village Market Stroll',
    'Scenic Pass Drive',
    'Franschhoek Motor Museum',
    'Mont Rochelle Picnic Grounds',
    'Main Road Art Galleries',
  ],
  gqeberha: [
    'Boardwalk Promenade',
    'Donkin Reserve',
    'Addo Elephant Day Tour',
    'Bayworld Museum',
    'Sardinia Bay Beach',
    'Route 67 Art Walk',
    'Kragga Kamma Game Park',
    'Humewood Beachfront',
    'St George Park Cricket Museum',
  ],
  knysna: [
    'Knysna Heads Viewpoint',
    'Lagoon Boat Cruise',
    'Featherbed Nature Reserve',
    'Thesen Island Walk',
    'Garden Route Scenic Drive',
    'Forest Canopy Tour',
    'Knysna Elephant Park Visit',
    'Brenton-on-Sea Sunset Spot',
    'Pezula Championship Golf Estate',
  ],
  'garden route': [
    'Tsitsikamma Adventure Route',
    'Wilderness Beach Day',
    'Cango Caves Experience',
    'Mossel Bay Lighthouse',
    'Outeniqua Mountain Pass',
    'Plettenberg Bay Lookouts',
    'Storms River Suspension Bridge',
    'Knysna Forest Hike',
    'Robberg Nature Reserve Trail',
  ],
  'kruger national park': [
    'Sunrise Game Drive',
    'Big Five Safari',
    'Bush Walk Experience',
    'Skukuza Cultural Visit',
    'Birding Trail Excursion',
    'Sunset Wildlife Tour',
    'Panorama Route Viewpoints',
    'Elephant Hall Museum',
    'Sabie River Safari Picnic',
  ],
};

const areaImagePools = {
  'cape town': [
    'https://images.unsplash.com/photo-1520637836862-4d197d17c89a?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1576485290814-1c72aa4bbb8e?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1485963631004-f2f00b1d6606?auto=format&fit=crop&w=1200&q=80',
  ],
  durban: [
    'https://images.unsplash.com/photo-1473116763249-2faaef81ccda?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1482192505345-5655af888cc4?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80',
  ],
  johannesburg: [
    'https://images.unsplash.com/photo-1486325212027-8081e485255e?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1519501025264-65ba15a82390?auto=format&fit=crop&w=1200&q=80',
  ],
  pretoria: [
    'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1491553895911-0055eca6402d?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1467269204594-9661b134dd2b?auto=format&fit=crop&w=1200&q=80',
  ],
  stellenbosch: [
    'https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1516594798947-e65505dbb29d?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1470158499416-75be9aa0c4db?auto=format&fit=crop&w=1200&q=80',
  ],
  franschhoek: [
    'https://images.unsplash.com/photo-1474552226712-ac0f0961a954?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1565120130286-dfbd9a7a4d8d?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=1200&q=80',
  ],
  gqeberha: [
    'https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1519046904884-53103b34b206?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1493558103817-58b2924bce98?auto=format&fit=crop&w=1200&q=80',
  ],
  knysna: [
    'https://images.unsplash.com/photo-1472396961693-142e6e269027?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1444464666168-49d633b86797?auto=format&fit=crop&w=1200&q=80',
  ],
  'garden route': [
    'https://images.unsplash.com/photo-1439853949127-fa647821eba0?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1455218873509-8097305ee378?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1470770841072-f978cf4d019e?auto=format&fit=crop&w=1200&q=80',
  ],
  'kruger national park': [
    'https://images.unsplash.com/photo-1534177616072-ef7dc120449d?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1546182990-dffeafbe841d?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1456926631375-92c8ce872def?auto=format&fit=crop&w=1200&q=80',
  ],
};

const fallbackImagePool = [
  'https://images.unsplash.com/photo-1472396961693-142e6e269027?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=1200&q=80',
];

const activityImageByKeyword = [
  {
    keywords: ['table mountain', 'cableway'],
    imageUrl: 'https://images.unsplash.com/photo-1520637836862-4d197d17c89a?auto=format&fit=crop&w=1200&q=80',
  },
  {
    keywords: ['waterfront', 'boat', 'cruise'],
    imageUrl: 'https://images.unsplash.com/photo-1576485290814-1c72aa4bbb8e?auto=format&fit=crop&w=1200&q=80',
  },
  {
    keywords: ['wine', 'winelands', 'tasting'],
    imageUrl: 'https://images.unsplash.com/photo-1516594798947-e65505dbb29d?auto=format&fit=crop&w=1200&q=80',
  },
  {
    keywords: ['quad', 'dunes', 'atlantis'],
    imageUrl: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=1200&q=80',
  },
  {
    keywords: ['bus', 'city sightseeing', 'tour'],
    imageUrl: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=1200&q=80',
  },
];

const activityImageByTitle = {
  'table mountain cableway or platteklip gorge hike': 'https://images.unsplash.com/photo-1520637836862-4d197d17c89a?auto=format&fit=crop&w=1200&q=80',
  'lion\'s head sunrise or sunset hike': 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=80',
  'cape point and cape of good hope': 'https://images.unsplash.com/photo-1485963631004-f2f00b1d6606?auto=format&fit=crop&w=1200&q=80',
  'chapman\'s peak drive': 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=1200&q=80',
  'kirstenbosch botanical gardens and canopy walkway': 'https://images.unsplash.com/photo-1470158499416-75be9aa0c4db?auto=format&fit=crop&w=1200&q=80',
  'v&a waterfront': 'https://images.unsplash.com/photo-1576485290814-1c72aa4bbb8e?auto=format&fit=crop&w=1200&q=80',
  'franschhoek wine tram experience': 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=1200&q=80',
  'stellenbosch wine estates': 'https://images.unsplash.com/photo-1516594798947-e65505dbb29d?auto=format&fit=crop&w=1200&q=80',
  'time out market cape town and waterfront seafood': 'https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&w=1200&q=80',
  'bo-kaap cape malay heritage walk': 'https://images.unsplash.com/photo-1473116763249-2faaef81ccda?auto=format&fit=crop&w=1200&q=80',
  'district six museum visit': 'https://images.unsplash.com/photo-1518998053901-5348d3961a04?auto=format&fit=crop&w=1200&q=80',
  'robben island historic tour': 'https://images.unsplash.com/photo-1526129318478-62ed807ebdf9?auto=format&fit=crop&w=1200&q=80',
  'castle of good hope': 'https://images.unsplash.com/photo-1519608487953-e999c86e7455?auto=format&fit=crop&w=1200&q=80',
  'zeitz mocaa at the v&a waterfront': 'https://images.unsplash.com/photo-1577720643272-265f09367456?auto=format&fit=crop&w=1200&q=80',
  'clifton beaches': 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80',
  'camps bay beachfront': 'https://images.unsplash.com/photo-1500375592092-40eb2168fd21?auto=format&fit=crop&w=1200&q=80',
  'muizenberg surf and beach huts': 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80',
  'bloubergstrand table mountain viewpoint': 'https://images.unsplash.com/photo-1485963631004-f2f00b1d6606?auto=format&fit=crop&w=1200&q=80',
  'paragliding from signal hill': 'https://images.unsplash.com/photo-1472396961693-142e6e269027?auto=format&fit=crop&w=1200&q=80',
  'table mountain abseiling': 'https://images.unsplash.com/photo-1522163182402-834f871fd851?auto=format&fit=crop&w=1200&q=80',
  'shark cage diving in gansbaai': 'https://images.unsplash.com/photo-1551244072-5d12893278ab?auto=format&fit=crop&w=1200&q=80',
  'ziplining in elgin': 'https://images.unsplash.com/photo-1472396961693-142e6e269027?auto=format&fit=crop&w=1200&q=80',
  'seal island boat trip from hout bay': 'https://images.unsplash.com/photo-1500375592092-40eb2168fd21?auto=format&fit=crop&w=1200&q=80',
  'cape point ostrich farm': 'https://images.unsplash.com/photo-1552728089-57bdde30beb3?auto=format&fit=crop&w=1200&q=80',
  'whale watching in hermanus (seasonal)': 'https://images.unsplash.com/photo-1568430462989-44163eb1752f?auto=format&fit=crop&w=1200&q=80',
  'boulders beach penguin colony': 'https://images.unsplash.com/photo-1551986782-d0169b3f8fa7?auto=format&fit=crop&w=1200&q=80',
};

function scoreSeed(activity, areaKey, index) {
  const text = `${activity}|${areaKey}|${index}`;
  return text.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
}

function getActivityStats(activity, area, areaKey, index) {
  const seed = scoreSeed(activity, areaKey, index);
  const rating = Number((4.3 + (seed % 7) * 0.1).toFixed(1));
  const recommendedCount = 120 + (area.mapCount * 6) + (seed % 220);

  return {
    rating,
    recommendedCount,
  };
}

function getActivityImage(activityTitle, imagePool, index) {
  const lookup = String(activityTitle || '').toLowerCase();
  const exactMatch = activityImageByTitle[lookup];

  if (exactMatch) {
    return exactMatch;
  }

  const keywordMatch = activityImageByKeyword.find(({ keywords }) =>
    keywords.some((keyword) => lookup.includes(keyword))
  );

  if (keywordMatch) {
    return keywordMatch.imageUrl;
  }

  return imagePool[index % imagePool.length];
}

function resolveArea(areaName) {
  const normalized = toAreaKey(areaName);

  if (!normalized) {
    return areaBlueprints[0];
  }

  const exact = areaBlueprints.find((area) => toAreaKey(area.city) === normalized);
  if (exact) {
    return exact;
  }

  const partial = areaBlueprints.find(
    (area) => toAreaKey(area.city).includes(normalized) || normalized.includes(toAreaKey(area.city))
  );

  return partial || areaBlueprints[0];
}

function getThingsToDoByArea(areaName) {
  const area = resolveArea(areaName);
  const key = toAreaKey(area.city);
  const activities = areaActivities[key] || areaActivities['cape town'];
  const imagePool = areaImagePools[key] || fallbackImagePool;
  const targetCardCount = 9;

  const cards = Array.from({ length: targetCardCount }, (_, index) => {
    const title = activities[index % activities.length];
    const stats = getActivityStats(title, area, key, index);

    return {
      id: `${key.replace(/\s+/g, '-')}-${index + 1}`,
      title,
      dates: 'Most recommended in this area',
      count: `${stats.recommendedCount.toLocaleString()} recommendations`,
      rating: stats.rating,
      imageUrl: getActivityImage(title, imagePool, index),
    };
  }).sort((a, b) => {
    if (b.rating !== a.rating) {
      return b.rating - a.rating;
    }

    return Number(b.count.replace(/[^0-9]/g, '')) - Number(a.count.replace(/[^0-9]/g, ''));
  });

  return {
    area: area.city,
    title: `Things to do in ${area.city}`,
    cards,
  };
}

module.exports = {
  getThingsToDoByArea,
};
