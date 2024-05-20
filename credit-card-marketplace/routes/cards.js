// routes/cards.js
const express = require('express');
const Card = require('../models/Card');
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

// POST create a new card
router.post('/', async (req, res) => {
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
