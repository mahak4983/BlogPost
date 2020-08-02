const Comment = require('../models/comment');

exports.getComment = (req, res, next ) => {
const blogId = req.params.blogId;
Comment.find({blogId:blogId})
.then(comments => {
    res.status(201).json({comments: comments});
})
.catch(err => {
    console.log(err);
})
}

exports.addComment = (req, res, next) => {
   // console.log(req.body);
   const comment = new Comment({
       name: req.body.name,
       comment: req.body.comment,
       blogId: req.body.blogId
   });
   comment.save()
   .then(result => {
       res.status(200).json({
           message: 'Comment Added'
       })
   })
   .catch(err =>{
       console.log(err);
   })
} 

exports.delCom = (req,res, next) =>{
    const commentId = req.params.commentId;
    Comment.findByIdAndRemove(commentId)
    .then(result =>{
        res.json({message:'Deleted'});
    })
}
