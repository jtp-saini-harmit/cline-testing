const express = require('express');
const router = express.Router();
const localStorage = require('../utils/localStorage');

// POST register new user
router.post('/register', (req, res) => {
  const { username, password } = req.body;
  const users = localStorage.getAll('users');
  
  if (users.find(user => user.username === username)) {
    return res.status(400).json({ message: 'Username already exists' });
  }
  
  const newUser = {
    id: Date.now().toString(),
    username,
    password // Note: In a real application, you should hash the password
  };
  
  localStorage.add('users', newUser);
  res.status(201).json({ message: 'User registered successfully', userId: newUser.id, username: newUser.username });
});

// POST login user
router.post('/login', (req, res) => {
  const { username, password } = req.body;
  const users = localStorage.getAll('users');
  
  const user = users.find(user => user.username === username && user.password === password);
  
  if (user) {
    res.json({ message: 'Login successful', userId: user.id, username: user.username });
  } else {
    res.status(401).json({ message: 'Invalid credentials' });
  }
});

// POST logout user
router.post('/logout', (req, res) => {
  // In a real application, you would invalidate the user's session here
  res.json({ message: 'Logout successful' });
});

// GET user info
router.get('/user/:userId', (req, res) => {
  const user = localStorage.getById('users', req.params.userId);
  if (user) {
    const { id, username } = user;
    res.json({ id, username });
  } else {
    res.status(404).json({ message: 'User not found' });
  }
});

module.exports = router;
