const express = require('express');
const router = express.Router();
const localStorage = require('../utils/localStorage');

// GET wishlist items
router.get('/:userId', (req, res) => {
  const wishlist = localStorage.getById('wishlists', req.params.userId) || [];
  res.json(wishlist);
});

// POST add item to wishlist
router.post('/:userId/add', (req, res) => {
  let wishlist = localStorage.getById('wishlists', req.params.userId);
  if (!wishlist) {
    wishlist = [];
  }
  
  const newItem = req.body;
  const existingItemIndex = wishlist.findIndex(item => item.id === newItem.id);
  
  if (existingItemIndex === -1) {
    wishlist.push(newItem);
    localStorage.update('wishlists', req.params.userId, wishlist);
    res.status(201).json(wishlist);
  } else {
    res.status(400).json({ message: 'Item already in wishlist' });
  }
});

// DELETE remove item from wishlist
router.delete('/:userId/remove/:productId', (req, res) => {
  let wishlist = localStorage.getById('wishlists', req.params.userId);
  if (!wishlist) {
    return res.status(404).json({ message: 'Wishlist not found' });
  }
  
  const itemIndex = wishlist.findIndex(item => item.id === req.params.productId);
  if (itemIndex > -1) {
    wishlist.splice(itemIndex, 1);
    localStorage.update('wishlists', req.params.userId, wishlist);
    res.json(wishlist);
  } else {
    res.status(404).json({ message: 'Item not found in wishlist' });
  }
});

module.exports = router;
