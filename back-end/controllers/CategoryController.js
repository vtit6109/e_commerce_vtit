const Category = require('../models/Category');

exports.getAllCategories = async (req, res) => {
  const Categories = await Category.find().populate('catalog');
  res.json(Categories);
};
