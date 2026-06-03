const express = require('express');

const { getThingsToDo } = require('../controllers/thingsToDoController');

const router = express.Router();

router.get('/', getThingsToDo);

module.exports = router;
