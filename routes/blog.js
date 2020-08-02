const express = require('express');

const blogController = require('../controllers/blog');

const router = express.Router();

router.post('/add-blog', blogController.addBlog)

router.get('/blogs', blogController.getBlogs)

router.get('/:blogId', blogController.getBlog);

module.exports = router;