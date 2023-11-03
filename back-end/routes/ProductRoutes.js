const express = require('express');
const router = express.Router();
const ProductController = require('../controllers/ProductController');

// Get all products
router.get('/', ProductController.getAllProducts);
// Get product by catalog
router.get('/:catalog', ProductController.getCatalogProduct);
// Get product by category
router.get('/:catalog/:category', ProductController.getCategoryProduct);
// Get product by id
router.get('/:catalog/:category/:id', ProductController.getSpecificProduct);
// Create one product
router.post('/', ProductController.createProduct);

module.exports = router;
