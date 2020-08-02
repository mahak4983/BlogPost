const express = require('express');

const commentController = require('../controllers/comment');

const router = express.Router();

router.post('/comment', commentController.addComment);

router.get('/comment/:blogId', commentController.getComment)

router.delete('/delete/:commentId', commentController.delCom);

module.exports = router;
