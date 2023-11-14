const User = require('../models/User');
const passport = require('passport');

exports.loginWithEmail = (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.status(400).json({ message: 'Người dùng không tồn tại.' });
    }
    req.logIn(user, function(err) {
      if (err) { 
        return next(err); 
      }
      return res.json(user);
    });
  })(req, res, next);
};

exports.checkPhoneNumber = async (req, res) => {
  const { phonenumber } = req.body;
  const user = await User.findOne({ phonenumber });
  if (!user) {
    return res.status(400).json({ message: 'Người dùng không tồn tại.' });
  }
  res.json(user);
};

exports.verifyCode = async (req, res) => {
  const { phonenumber, code } = req.body;
  const FAKE_VERIFICATION_CODE = '061099'
  if (code !== FAKE_VERIFICATION_CODE) {
    return res.status(400).json({ message: 'Mã xác thực không chính xác.' });
  }
  const user = await User.findOne({ phonenumber });
  if (!user) {
    return res.status(400).json({ message: 'Người dùng không tồn tại.' });
  }
  res.json(user);
};

exports.registerUser = async (req, res) => {
  try {
    const newUser = new User(req.body);
    await newUser.save();
    res.json(newUser);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
