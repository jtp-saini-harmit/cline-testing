const express = require('express');
const router = express.Router();
const localStorage = require('../utils/localStorage');

// GET cart items
router.get('/:userId', (req, res) => {
  const cart = localStorage.getById('carts', req.params.userId) || { id: req.params.userId, items: [] };
  res.json(cart);
});

// POST add item to cart
router.post('/:userId/add', (req, res) => {
  try {
    let cart = localStorage.getById('carts', req.params.userId);
    if (!cart) {
      cart = { id: req.params.userId, items: [] };
    }
    
    const newItem = req.body;
    console.log('Received new item:', newItem);

    if (!newItem.productId || !newItem.quantity) {
      return res.status(400).json({ message: 'Invalid item data. ProductId and quantity are required.' });
    }

    const existingItemIndex = cart.items.findIndex(item => item.productId === newItem.productId);
    
    if (existingItemIndex > -1) {
      cart.items[existingItemIndex].quantity += newItem.quantity;
    } else {
      cart.items.push(newItem);
    }
    
    const updatedCart = localStorage.update('carts', req.params.userId, cart);
    console.log('Updated cart:', updatedCart);

    if (!updatedCart) {
      return res.status(500).json({ message: 'Failed to update cart in localStorage.' });
    }

    res.status(201).json(updatedCart);
  } catch (error) {
    console.error('Error adding item to cart:', error);
    res.status(500).json({ message: 'An error occurred while adding the item to the cart.', error: error.message });
  }
});

// PUT update cart item quantity
router.put('/:userId/update/:productId', (req, res) => {
  let cart = localStorage.getById('carts', req.params.userId);
  if (!cart) {
    return res.status(404).json({ message: 'Cart not found' });
  }
  
  const itemIndex = cart.items.findIndex(item => item.productId === req.params.productId);
  if (itemIndex > -1) {
    cart.items[itemIndex].quantity = req.body.quantity;
    localStorage.update('carts', req.params.userId, cart);
    res.json(cart);
  } else {
    res.status(404).json({ message: 'Item not found in cart' });
  }
});

// DELETE remove item from cart
router.delete('/:userId/remove/:productId', (req, res) => {
  let cart = localStorage.getById('carts', req.params.userId);
  if (!cart) {
    return res.status(404).json({ message: 'Cart not found' });
  }
  
  const itemIndex = cart.items.findIndex(item => item.productId === req.params.productId);
  if (itemIndex > -1) {
    cart.items.splice(itemIndex, 1);
    localStorage.update('carts', req.params.userId, cart);
    res.json(cart);
  } else {
    res.status(404).json({ message: 'Item not found in cart' });
  }
});

module.exports = router;
