const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BlogPostSchema = new Schema({
    admin:{
        type: Schema.Types.ObjectId,
        ref: 'admins'
    },
    title:{
        type: String,
        required: true
    },
    body:{
        type: String,
        required: true
    },
    tags:{
        type: [
            {
                type: String
            }
        ],
        required: true
    },
    images:{
        type: [String],
    },
    mainImage:{
        type: String,
        required: true
    },
    favoritesCount: {
        type: Number, 
        default: 0
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = BlogPost = mongoose.model('blogposts', BlogPostSchema);