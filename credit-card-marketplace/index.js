// index.js
const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();
const app = express();
connectDB();
app.use(cors());
app.use(express.json());

app.use('/api/cards', require('./routes/cards'));
app.use('/api/auth', require('./routes/auth'));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

// index.js (add these lines)
const path = require('path');
app.use(express.static(path.join(__dirname, 'credit-card-widget/build')));
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'credit-card-widget/build/index.html'));
});

