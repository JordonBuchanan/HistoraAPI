const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs');

const User = new Schema(
    {
        name:{
            type: String,
        },
        email:{
            type: String,
            required: true,
        },
        password:{
            type: String,
            required: true
        },
        biography:{
            type: String
        },
        avatar:{
            type: String
        },
        favorites:{
            type:[
                { 
                    type: mongoose.Schema.Types.ObjectId, 
                    ref: 'books' 
                }
            ],
        },
        friends:{
            type:[
                { 
                    type: mongoose.Schema.Types.ObjectId, 
                    ref: 'users' 
                }
            ],
        },
        meta:{
            friends: Number,
            posts: Number,
        }
    },
    {
        timestamps: true
    }
)

User.pre('save', function(next){
    const user = this;
    bcrypt.genSalt(10, function(err, salt){
        if(err){
            res.json({ success: false, msg: err.message });
        } else {
            bcrypt.hash(user.password, salt, function(err, hashed){
                if(err){
                    return next(err);
                }
                user.password = hashed
                next();
            });
        }
    });
});

User.methods.favorite = function(id){
    if(this.favorites.indexOf(id) === -1){
      this.favorites.push(id);
    }
  
    return this.save();
  };
  
  User.methods.unfavorite = function(id){
    this.favorites.remove(id);
    return this.save();
  };
  
  User.methods.isFavorite = function(id){
    return this.favorites.some(function(favoriteId){
      return favoriteId.toString() === id.toString();
    });
  };
  
  User.methods.follow = function(id){
    if(this.following.indexOf(id) === -1){
      this.following.push(id);
    }
  
    return this.save();
  };
  
  User.methods.unfollow = function(id){
    this.following.remove(id);
    return this.save();
  };
  
  User.methods.isFollowing = function(id){
    return this.following.some(function(followId){
      return followId.toString() === id.toString();
    });
  };

module.exports = mongoose.model('users', User);
