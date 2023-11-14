require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const passport = require('passport');
const bodyParser = require('body-parser');
const cors = require('cors');
const connectDB = require('./config/db/connectdb');

// Khởi tạo Passport.js
require('./config/auth/passport');

connectDB();

const app = express();

// user session
app.use(session({ secret: 'your session secret', resave: false, saveUninitialized: false }));

// initial Passport và session Passport
app.use(passport.initialize());
app.use(passport.session());

app.use(bodyParser.json());
app.use(cors());

const productRoutes = require('./routes/ProductRoutes')
app.use('/ecommercebyvtit/products', productRoutes);

const userRoutes = require('./routes/UserRoutes');
app.use('/ecommercebyvtit/users', userRoutes);

const catalogRoutes = require('./routes/CatalogRoutes');
app.use('/ecommercebyvtit/catalogs', catalogRoutes);

const categoryRoutes = require('./routes/CategoryRoutes');
app.use('/ecommercebyvtit/categories', categoryRoutes);

const cartRoutes = require('./routes/CartRoutes');
app.use('/ecommercebyvtit/carts', cartRoutes);

const port = process.env.PORT || 8000;
app.listen(port, () => console.log(`http://localhost:${port}`));
