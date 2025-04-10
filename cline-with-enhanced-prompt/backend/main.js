const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 3001;

// Import routes
const productsRouter = require('./routes/products');
const cartRouter = require('./routes/cart');
const wishlistRouter = require('./routes/wishlist');
const authRouter = require('./routes/auth');
const ordersRouter = require('./routes/orders');

app.use(cors());
app.use(express.json());

// Use routes
app.use('/api/products', productsRouter);
app.use('/api/cart', cartRouter);
app.use('/api/wishlist', wishlistRouter);
app.use('/api/auth', authRouter);
app.use('/api/orders', ordersRouter);

// Basic error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// Add some dummy data to the localStorage
const localStorage = require('./utils/localStorage');
const { dummyProducts } = require('./dummyData');

if (localStorage.getAll('products').length === 0) {
  dummyProducts.forEach(product => localStorage.add('products', product));
  console.log('Dummy products added to localStorage');
}

app.listen(port, () => {
  console.log(`Backend server running on port ${port}`);
});
