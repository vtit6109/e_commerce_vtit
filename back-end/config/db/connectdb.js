const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}/${process.env.DB_NAME}?retryWrites=true&w=majority`, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log('---------------------Connect successfuly---------------------');
  } catch (err) {
    console.log('x-x-x-x-x-x-x-x-x-x-x-x-Connect failure-x-x-x-x-x-x-x-x-x-x-x-x');
    process.exit(1);
  }
};

module.exports = connectDB;
