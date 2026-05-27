const express = require('express');

const { getProperties, getPropertyAreas, getPropertyPhoto } = require('../controllers/propertyController');

const router = express.Router();

router.get('/', getProperties);
router.get('/areas', getPropertyAreas);
router.get('/photo', getPropertyPhoto);

module.exports = router;
