// models/Card.js
const mongoose = require('mongoose');
const CardSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  category: { type: String, required: true },
  applyLink: { type: String, required: true },
});
module.exports = mongoose.model('Card', CardSchema);

