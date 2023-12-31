const User = require('../models/User');
const bcrypt = require('bcrypt');

exports.getAllUsers = async (req, res) => {
  const users = await User.find({});
  res.json(users);
};

exports.getUser = async (req, res) => {
  const user = await User.findById(req.params._id); 
  res.json(user);
};

exports.updateUser = async (req, res) => {
  const updatedUser = await User.findByIdAndUpdate(req.params._id, req.body, { new: true }); 
  res.json(updatedUser);
};

exports.addNewAddress = async (req, res) => {
  try {
    const user = await User.findById(req.params._id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    user.shippingaddress.push(req.body);
    await user.save();
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteAddress = async (req, res) => {
  try {
    const user = await User.findById(req.params._id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    user.shippingaddress = user.shippingaddress.filter(address => address._id.toString() !== req.params.addressId);
    await user.save();
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


exports.registerUser = async (req, res) => {
  try {;
    const newUser = new User(req.body);
    await newUser.save();
    res.json(newUser);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
