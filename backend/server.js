require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const authRoutes = require('./routes/auth');
const postRoutes = require('./routes/posts');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());

app.use(bodyParser.json());
app.use('/auth', authRoutes);
app.use('/posts', postRoutes);
app.use(cors()); // Enable CORS for all requests

mongoose
  .connect(process.env.MONGO_URI) // Remove useNewUrlParser & useUnifiedTopology
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Routes
app.use('/api/auth', authRoutes);

// Start Server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));