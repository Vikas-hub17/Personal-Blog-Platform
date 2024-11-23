require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const authRoutes = require('./routes/auth');
const postRoutes = require('./routes/posts');

const app = express();
app.use(bodyParser.json());
app.use('/auth', authRoutes);
app.use('/posts', postRoutes);
app.use(cors()); // Enable CORS for all requests

mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true }) // Remove useNewUrlParser & useUnifiedTopology
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('MongoDB connection error:', err));
