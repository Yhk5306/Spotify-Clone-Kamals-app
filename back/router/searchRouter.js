const express = require('express');
const router = express.Router();
const SearchController = require('../controllers/SearchController');

router.get('/search/:search',SearchController.search);

module.exports = router;