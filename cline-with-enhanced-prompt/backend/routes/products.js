const express = require('express');
const router = express.Router();
const localStorage = require('../utils/localStorage');
const { dummyProducts } = require('../dummyData');

// GET all products
router.get('/', (req, res) => {
  const products = localStorage.getAll('products');
  if (products.length === 0) {
    // If no products in localStorage, return dummy products
    res.json(dummyProducts);
  } else {
    res.json(products);
  }
});

// GET a single product by ID
router.get('/:id', (req, res) => {
  const product = localStorage.getById('products', req.params.id);
  if (product) {
    res.json(product);
  } else {
    // If product not found in localStorage, check dummy products
    const dummyProduct = dummyProducts.find(p => p.id === req.params.id);
    if (dummyProduct) {
      res.json(dummyProduct);
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  }
});

// POST a new product
router.post('/', (req, res) => {
  const newProduct = {
    id: Date.now().toString(),
    ...req.body
  };
  const addedProduct = localStorage.add('products', newProduct);
  res.status(201).json(addedProduct);
});

// PUT update a product
router.put('/:id', (req, res) => {
  const updatedProduct = localStorage.update('products', req.params.id, req.body);
  if (updatedProduct) {
    res.json(updatedProduct);
  } else {
    res.status(404).json({ message: 'Product not found' });
  }
});

// DELETE a product
router.delete('/:id', (req, res) => {
  const deletedProduct = localStorage.remove('products', req.params.id);
  if (deletedProduct) {
    res.json({ message: 'Product deleted successfully' });
  } else {
    res.status(404).json({ message: 'Product not found' });
  }
});

module.exports = router;
