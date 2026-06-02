const express = require('express');

const {
	getStays,
	getStayAreas,
	getStayThingsToDo,
	refreshStaysSnapshot,
} = require('../controllers/staysController');

const router = express.Router();

router.get('/', getStays);
router.get('/areas', getStayAreas);
router.get('/things-to-do', getStayThingsToDo);
router.post('/refresh', refreshStaysSnapshot);

module.exports = router;
