require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const authRoutes = require('./routes/auth');
const postRoutes = require('./routes/posts');

const app = express();
app.use(bodyParser.json());
app.use('/auth', authRoutes);
app.use('/posts', postRoutes);

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => app.listen(process.env.PORT, () => console.log('Server running')))
  .catch(err => console.error(err));
