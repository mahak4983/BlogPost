const Blog = require('../models/blog');

exports.getBlogs = ( req, res, next ) => {
    const currentPage = req.query.page || 1;
    const perPage = 3;
    let totalItems;
     Blog.find().countDocuments()
     .then(result => {
         totalItems=result;
         return Blog.find()
         .skip((currentPage-1)*perPage)
         .limit(perPage);
     })
     .then(blogs => {
         res.status(200).json({
             blogs: blogs,
             totalItems: totalItems
         })
     })
     .catch(err => {
         console.log(err);
     })
}

exports.addBlog = ( req, res, next) => {
    //console.log(req.body.heading, req.body.content);
    const blog = new Blog({
        heading: req.body.heading,
        content: req.body.content 
    });
    blog.save()
    .then(result => {
        res.json({message:'Done'});

    })
    .catch(err => {

    })
}

exports.getBlog = (req, res, next ) => {
    const blogId = req.params.blogId;
    // console.log(blogId);
    Blog.findById(blogId)
    .then(blog => {
        res.status(200).json({blog: blog})
    })
    .catch(err => {
        console.log(err);
    })
}