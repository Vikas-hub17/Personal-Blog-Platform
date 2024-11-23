// routes/posts.js (or similar)
const express = require('express');
const router = express.Router();
const { verifyToken } = require('../middleware/auth'); // Middleware for authentication
const Post = require('../models/Post'); // Your Post model

// Create a new post
router.post('/', verifyToken, async (req, res) => {
  try {
    const { title, content } = req.body;
    const userId = req.user.id; // Assuming verifyToken adds user to req

    if (!title || !content) {
      return res.status(400).json({ message: 'Title and content are required.' });
    }

    const newPost = new Post({ title, content, author: userId });
    await newPost.save();

    res.status(201).json(newPost); // Respond with the created post
  } catch (error) {
    console.error('Error creating post:', error);
    res.status(500).json({ message: 'Failed to create post.' });
  }
});

module.exports = router;
