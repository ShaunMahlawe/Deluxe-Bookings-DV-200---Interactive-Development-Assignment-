const Catalog = require('../models/catalogSchema')
const { isDatabaseConnected } = require('../config/db')
const southAfricaCatalogSeed = require('../utils/southAfricaCatalogSeed')

const CATALOG_SLUG = 'south-africa-hospitality'

async function getCatalog(req, res) {
  if (!isDatabaseConnected()) {
    return res.json({
      source: 'seed-fallback',
      catalog: southAfricaCatalogSeed,
    })
  }

  let catalog = await Catalog.findOne({ slug: CATALOG_SLUG }).lean()

  if (!catalog) {
    catalog = await Catalog.create({
      slug: CATALOG_SLUG,
      data: southAfricaCatalogSeed,
    })
  }

  const baseCatalog = catalog?.data || southAfricaCatalogSeed
  const enrichedCatalog = {
    ...baseCatalog,
    navbar: {
      ...(baseCatalog.navbar || {}),
      destinationSuggestions: southAfricaCatalogSeed.navbar.destinationSuggestions,
    },
    search: {
      ...(baseCatalog.search || {}),
      properties: southAfricaCatalogSeed.search.properties,
    },
    thingsToDo: {
      ...(baseCatalog.thingsToDo || {}),
      cards: southAfricaCatalogSeed.thingsToDo.cards,
    },
    filters: {
      ...southAfricaCatalogSeed.filters,
    },
  }

  return res.json({
    source: 'mongo',
    catalog: enrichedCatalog,
  })
}

module.exports = {
  getCatalog,
}
