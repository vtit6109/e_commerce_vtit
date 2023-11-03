const express = require('express');
const router = express.Router();
const CatalogController = require('../controllers/CatalogController');

router.get('/', CatalogController.getAllCatalogs);

module.exports = router;
