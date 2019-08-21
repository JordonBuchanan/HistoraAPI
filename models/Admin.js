const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs');


const Admin = new Schema(
    {
        name:{
            type: String,
            required: true
        },
        email:{
            type: String,
            required: true
        },
        password:{
            type: String,
            required: true
        },
        avatar:{
            type: String
        },
        biography: {
            type: String
        },
        access:{
            type: [String],
            required: true
        }, 
        favorites:{
            type:{ 
                type: mongoose.Schema.Types.ObjectId, 
                refPath: 'onModel' 
            }
        },
        onModel: {
            id:{
                type: String
            },
            enum: ['booksmedias', 'videosmedias', 'podcastsmedias', 'papermedias']
        },
    },
    {
        timestamps: true
    }
)

Admin.pre('save', function(next){
    const admin = this;
    bcrypt.genSalt(10, function(err, salt){
        if(err){
            res.json({ success: false, msg: err.message });
        } else {
            bcrypt.hash(admin.password, salt, function(err, hashed){
                if(err){
                    return next(err);
                }
                admin.password = hashed
                next();
            });
        }
    });
});

Admin.methods.favorite = function(id){
    if(this.favorites.indexOf(id) === -1){
      this.favorites.push(id);
    }
    return this.save();
  };
  
  Admin.methods.unfavorite = function(id){
    this.favorites.remove(id);
    return this.save();
  };
  
  Admin.methods.isFavorite = function(id){
    return this.favorites.some(function(favoriteId){
      return favoriteId.toString() === id.toString();
    });
  };

module.exports = mongoose.model('admins', Admin);