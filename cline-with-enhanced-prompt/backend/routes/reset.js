const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

const initialData = {
  products: [
    {
      id: '1',
      name: 'Sample Product 1',
      price: 29.99,
      description: 'A great product for testing',
    },
    {
      id: '2',
      name: 'Sample Product 2',
      price: 39.99,
      description: 'Another amazing product',
    }
  ],
  users: [],
  carts: {}, // Each cart will have structure: { items: [] }
  wishlists: {}, // Each wishlist will have structure: { items: [] }
  orders: []
};

router.post('/', (req, res) => {
  try {
    const dataFilePath = path.join(__dirname, '..', 'data.json');
    // Add default structure for carts and wishlists
    const data = {
      ...initialData,
      carts: {},
      wishlists: {}
    };
    fs.writeFileSync(dataFilePath, JSON.stringify(data, null, 2));
    res.json({ message: 'Data reset successfully' });
  } catch (error) {
    console.error('Error resetting data:', error);
    res.status(500).json({ message: 'Failed to reset data' });
  }
});

module.exports = router;
