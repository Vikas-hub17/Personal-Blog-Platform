const Post = require('../models/Post');

// Controller to create a post
const createPost = async (req, res) => {
  try {
    const { title, content } = req.body;
    const post = new Post({ title, content, authorId: req.user.id });
    const savedPost = await post.save();
    res.status(201).json(savedPost);
  } catch (error) {
    res.status(500).json({ message: 'Failed to create post', error: error.message });
  }
};

// Controller to get posts by the logged-in user
const getPostsByUser = async (req, res) => {
  try {
    const posts = await Post.find({ authorId: req.user.id }).sort({ createdAt: -1 });
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch posts', error: error.message });
  }
};

module.exports = { createPost, getPostsByUser };
