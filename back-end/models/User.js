const mongoose = require('mongoose');
const UserSchema = new mongoose.Schema({
  useremail: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  phonenumber: {
    type: String,
    required: true
  },
  role: [String],
  personalDetails: {
    name: String,
    nickname: String,
    gender: String,
    birthday: Date,
    nationality: String,
    phone: String,
    avatar: String,
    link: {
      facebooklink: String,
      googlelink: String
    }
  },
  shippingaddress: [
    {
    receivername: String,
    phonenumber: String,
    defaultaddress: Boolean,
    street: String,
    ward: String,
    district: String,
    province: String,
    detailaddress: String
  }
]
});

module.exports = mongoose.model('User', UserSchema);
