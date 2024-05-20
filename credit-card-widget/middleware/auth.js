// middleware/auth.js
const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
  const token = req.header('x-auth-token');
  if (!token) return res.status(401).json({ message: 'No token, authorization denied' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ message: 'Token is not valid' });
  }
};

// routes/cards.js (apply the auth middleware)
const express = require('express');
const Card = require('../models/Card');
const auth = require('../middleware/auth');
const router = express.Router();

// GET all cards
router.get('/', async (req, res) => {
  try {
    const cards = await Card.find();
    res.json(cards);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST create a new card (protected route)
router.post('/', auth, async (req, res) => {
  const { name, description, category, applyLink } = req.body;
  try {
    const newCard = new Card({ name, description, category, applyLink });
    const card = await newCard.save();
    res.json(card);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
