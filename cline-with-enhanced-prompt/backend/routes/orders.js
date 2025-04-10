const express = require('express');
const router = express.Router();
const localStorage = require('../utils/localStorage');

// POST create a new order
router.post('/', (req, res) => {
  const { userId, items, address, total } = req.body;
  
  const newOrder = {
    id: Date.now().toString(),
    userId,
    items,
    address,
    total,
    status: 'pending',
    createdAt: new Date().toISOString()
  };

  localStorage.add('orders', newOrder);

  // Clear the user's cart
  localStorage.update('carts', userId, { items: [] });

  res.status(201).json({ message: 'Order created successfully', orderId: newOrder.id });
});

// GET user's orders
router.get('/:userId', (req, res) => {
  const orders = localStorage.getAll('orders').filter(order => order.userId === req.params.userId);
  res.json(orders);
});

module.exports = router;
