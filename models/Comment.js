const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CommentSchema = new Schema({
    user:{
        type: Schema.Types.ObjectId,
        ref: 'users'
    },
    text:{
        type: String,
        required: true
    },
    post: [
        { 
            type: mongoose.Schema.Types.ObjectId, 
            ref: 'posts' 
        }
    ],
    likes: [
        { 
            type: mongoose.Schema.Types.ObjectId, 
            ref: 'likes' 
        }
    ],
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = Comment = mongoose.model('comments', CommentSchema);