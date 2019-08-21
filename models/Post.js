const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const User = './UserModel'

const PostSchema = new Schema({
    user:{
        id:{
            type: Schema.Types.ObjectId,
            ref: 'users'
        },
        name: String,
        email: String,
        avatar: String
    },
    admin:{
        id:{
            type: Schema.Types.ObjectId,
            ref: 'admins'
        },
        name: String,
        email: String,
        avatar: String
    },
    title:{
        type: String
    },
    image:{
        type: String
    },
    body:{
        type:String
    },
    likes: [
        {
            user: {
                id:{
                    type: Schema.Types.ObjectId,
                    ref: 'users'
                },
                name: String,
            },
            admin: {
                id:{
                    type: Schema.Types.ObjectId,
                    ref: 'admins'
                },
                name: String,
            }
        }
    ],
    comments: [
        {
            user: {
                id:{
                    type: Schema.Types.ObjectId,
                    ref: 'users'
                },
                name: String,
                email: String,
                avatar: String,
            },
            admin: {
                id:{
                    type: Schema.Types.ObjectId,
                    ref: 'admins'
                },
                name: String,
                email: String,
                avatar: String,
            },
            body: {
                type: String,
                required: true
            },
            name:{
                type: String
            },
            avatar:{
                type: String
            },
            image:{
                type: String
            },
            date: {
                type: Date,
                default: Date.now
            }
        }
    ],
    date: {
        type: Date,
        default: Date.now
    }
});


module.exports = Post = mongoose.model('posts', PostSchema);