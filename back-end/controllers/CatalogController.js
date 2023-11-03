const Catalog = require('../models/Catalog');

exports.getAllCatalogs = async (req, res) => {
  const catalogs = await Catalog.find({});
  res.json(catalogs);
};
