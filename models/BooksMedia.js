const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BooksMediaSchema = new Schema({
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
    author:{
        type: String
    },
    source: {
        type: String,
    },
    link: {
        type: String
    },
    favoritesCount: {
        type: Number, default: 0
    },
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

BooksMediaSchema.methods.updateFavoriteCount = function() {
    var media = this;
  console.log(this)
    return Admin.count({favorites: {$in: [books._id]}}).then(function(count){
      media.favoritesCount = count;
  
      return media.save();
    });
  };

module.exports = BooksMedia = mongoose.model('booksmedias', BooksMediaSchema);