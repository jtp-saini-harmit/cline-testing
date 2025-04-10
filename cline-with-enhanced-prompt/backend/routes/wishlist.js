const express = require('express');
const router = express.Router();
const localStorage = require('../utils/localStorage');

// GET wishlist items
router.get('/:userId', (req, res) => {
  let wishlist = localStorage.getById('wishlists', req.params.userId);
  if (!wishlist) {
    wishlist = { items: [] };
    localStorage.update('wishlists', req.params.userId, wishlist);
  }
  res.json(wishlist.items || []);
});

// POST add item to wishlist
router.post('/:userId/add', (req, res) => {
  let wishlist = localStorage.getById('wishlists', req.params.userId);
  if (!wishlist) {
    wishlist = { items: [] };
  }
  
  const { id, name, price, description } = req.body;
  
  if (!id || !name || price === undefined) {
    return res.status(400).json({ message: 'Invalid product data. Required fields: id, name, price' });
  }

  const newItem = { id, name, price, description };
  const existingItemIndex = wishlist.items ? wishlist.items.findIndex(item => item.id === id) : -1;
  
  if (existingItemIndex === -1) {
    wishlist.items = [...(wishlist.items || []), newItem];
    localStorage.update('wishlists', req.params.userId, wishlist);
    res.status(201).json(wishlist.items);
  } else {
    res.status(400).json({ message: 'Item already in wishlist' });
  }
});

// DELETE remove item from wishlist
router.delete('/:userId/remove/:productId', (req, res) => {
  let wishlist = localStorage.getById('wishlists', req.params.userId);
  if (!wishlist || !wishlist.items) {
    return res.status(404).json({ message: 'Wishlist not found' });
  }
  
  const itemIndex = wishlist.items.findIndex(item => item.id === req.params.productId);
  if (itemIndex > -1) {
    wishlist.items.splice(itemIndex, 1);
    localStorage.update('wishlists', req.params.userId, wishlist);
    res.json(wishlist.items);
  } else {
    res.status(404).json({ message: 'Item not found in wishlist' });
  }
});

module.exports = router;
