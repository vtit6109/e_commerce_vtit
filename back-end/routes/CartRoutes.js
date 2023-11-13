const express = require('express');
const router = express.Router();
const cartController = require('../controllers/CartController');

router.get('/getCart/:userId', cartController.getCart);
router.post('/addToCart/:userId', cartController.addToCart);

module.exports = router;
