const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const commentSchema = new Schema({
    name:{
        type: String,
        required: true,
    },
    comment:{
        type: String,
        required: true
    },
    blogId:{
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'Blog'
    }

})
module.exports = mongoose.model('Comment', commentSchema);
