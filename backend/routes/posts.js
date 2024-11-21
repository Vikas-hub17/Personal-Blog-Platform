const express = require('express');
const Post = require('../models/Post');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/', authMiddleware, async (req, res) => {
  const { title, content } = req.body;
  const post = new Post({ title, content, authorId: req.user.id });
  await post.save();
  res.status(201).json(post);
});

router.get('/', async (req, res) => {
  const { author } = req.query;
  const filter = author ? { authorId: author } : {};
  const posts = await Post.find(filter).populate('authorId', 'email');
  res.json(posts);
});

module.exports = router;
