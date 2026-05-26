const Catalog = require('../models/Catalog')
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

  return res.json({
    source: 'mongo',
    catalog: catalog.data || southAfricaCatalogSeed,
  })
}

module.exports = {
  getCatalog,
}
