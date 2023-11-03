require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');

const bodyParser = require('body-parser');
const app = express();
const cors = require('cors');

const path = require('path');
const connectDB = require('./config/db/connectdb');

connectDB();

app.use(bodyParser.json());
app.use(cors());

// // Phục vụ các tệp tĩnh từ thư mục build của Vite
// app.use(express.static(path.join(__dirname, '../front-end/dist')));

// Route cuối cùng trả lại trang chính của React
// app.get('*', (req, res) => {
//   res.sendFile(path.resolve(__dirname, '../front-end/dist', 'index.html'));
// });

const productRoutes = require('./routes/ProductRoutes')
app.use('/ecommercebyvtit/products', productRoutes);

const userRoutes = require('./routes/UserRoutes');
app.use('/ecommercebyvtit/users', userRoutes);

const catalogRoutes = require('./routes/CatalogRoutes');
app.use('/ecommercebyvtit/catalogs', catalogRoutes);

const categoryRoutes = require('./routes/CategoryRoutes');
app.use('/ecommercebyvtit/categories', categoryRoutes);


const port = process.env.PORT || 8000;
app.listen(port, () => console.log(`http://localhost:${port}`));
