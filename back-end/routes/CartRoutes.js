const express = require('express');
const router = express.Router();
const cartController = require('../controllers/CartController');

// middleware check login
function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.status(401).json({ message: 'Bạn cần đăng nhập để thực hiện hành động này' });
}

router.get('/getCart/:userId', isLoggedIn, cartController.getCart);
router.post('/addToCart/:userId', isLoggedIn, cartController.addToCart);

module.exports = router;
