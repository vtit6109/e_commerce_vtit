const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
  productName: String,
  productDescription: String,
  productDetails: {
    title: String,
    values: String,
  },
  productPrice: Number,
  active: Boolean,
  favoriteStar: Number,
  imgUrl: [String],
  brand: String,
  category: {type: mongoose.Schema.Types.ObjectId, ref: 'Category' },
  sold: Number
});

module.exports = mongoose.model('Product', ProductSchema);
