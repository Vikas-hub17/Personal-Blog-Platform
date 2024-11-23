// routes/posts.js (or similar)
const express = require('express');
const { createPost, getPostsByUser } = require('../controllers/posts');
const auth = require('../middleware/authMiddleware');
const router = express.Router();

// Route to create a post
router.post('/', auth, createPost); // Ensure `createPost` is defined and imported correctly

// Route to get posts by the logged-in user
router.get('/user', auth, getPostsByUser); // Ensure `getPostsByUser` is defined and imported correctly

module.exports = router;