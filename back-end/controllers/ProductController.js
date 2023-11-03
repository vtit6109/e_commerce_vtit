const express = require('express');
const router = express.Router();
const Product = require('../models/Product');

exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find().populate({
      path: 'category',
      populate: { path: 'catalog' }
    });
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get catalog products
exports.getCatalogProduct = async (req, res) => {
  const catalog = req.params.catalog;
  const products = await Product.find().populate({
    path: 'category',
    populate: { path: 'catalog' }
  });

  const filteredProducts = products.filter(product => product.category.catalog.url === catalog);
  res.json(filteredProducts);
}

// Get category products
exports.getCategoryProduct = async (req, res) => {
  const catalog = req.params.catalog;
  const category = req.params.category;
  const products = await Product.find().populate({
    path: 'category',
    populate: { path: 'catalog' }
  });

  const filteredProducts = products.filter(product => product.category.catalog.url === catalog && product.category.url === category);

  res.json(filteredProducts);
}

// Get a specific product
exports.getSpecificProduct = async (req, res) => {
  const id = req.params.id;

  const product = await Product.findById(id).populate({
    path: 'category',
    populate: { path: 'catalog' }
  });

  if (product == null) {
    return res.status(404).json({ message: 'Cannot find product' });
  }

  res.json(product);
}


// Create one product
exports.createProduct = async (req, res) => {
  const product = new Product({
    // Fill in with fields from req.body
  });

  try {
    const newProduct = await product.save();
    res.status(201).json(newProduct);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
