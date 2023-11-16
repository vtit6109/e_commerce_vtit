const express = require('express');
const router = express.Router();
const cartController = require('../controllers/CartController');

router.get('/getCart/:userId', cartController.getCart);
router.post('/addToCart/:userId', cartController.addToCart);
router.post('/updateQuantity/:userId', cartController.updateQuantity);
router.post('/removeFromCart/:userId', cartController.removeFromCart);

module.exports = router;
