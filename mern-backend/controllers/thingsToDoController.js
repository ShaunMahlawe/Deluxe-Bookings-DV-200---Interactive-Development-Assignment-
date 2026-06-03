const { getThingsToDoByArea } = require('../utils/southAfricaThingsToDo');
const { getGoogleThingsToDoByArea, isGooglePlacesConfigured } = require('../services/googlePlacesService');
const { getDeluxeThingsToDoByArea, isDeluxePlacesConfigured } = require('../services/deluxePlacesService');

async function getThingsToDo(req, res) {
  const { area } = req.query;

  if (isDeluxePlacesConfigured()) {
    try {
      const deluxeResult = getDeluxeThingsToDoByArea({ area, limit: 9 });

      if (Array.isArray(deluxeResult?.thingsToDo?.cards) && deluxeResult.thingsToDo.cards.length > 0) {
        return res.json(deluxeResult);
      }
    } catch (error) {
      console.error('Deluxe API things-to-do lookup failed:', error.message);
    }
  }

  if (isGooglePlacesConfigured()) {
    try {
      const baseUrl = `${req.protocol}://${req.get('host')}`;
      const thingsToDo = await getGoogleThingsToDoByArea({ area, baseUrl, limit: 9 });

      if (Array.isArray(thingsToDo?.cards) && thingsToDo.cards.length > 0) {
        return res.json({
          source: 'google-places',
          area: thingsToDo.area,
          thingsToDo,
        });
      }
    } catch (error) {
      console.error('Google Places things-to-do lookup failed:', error.message);
    }
  }

  const thingsToDo = getThingsToDoByArea(area);

  return res.json({
    source: 'seed-generated',
    area: thingsToDo.area,
    thingsToDo,
  });
}

module.exports = {
  getThingsToDo,
};
