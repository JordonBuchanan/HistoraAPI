const { PostModel } = require('../models');
const { UserModel } = require('../models');
const { AdminModel } = require('../models');
const HttpStatus = require('../HttpStatus');
const { validateToken } = require('../middleware/validateToken');

favorite = async(req, res, next) => {
    var post = req.body.body;
    
    AdminModel.findById(req.body.admin.admin._id).then(function(user){
      if (!user) { return res.sendStatus(HttpStatus.unauthorized); }
  
      return user.favorite(post).then(function(post){
        return res.json({post: "Added"});
    }).catch(next);
  });
};
  
 unfavorite = async(req, res, next) => {
    var postId = req.post._id;
  
    UserModel.findById(req.payload.id).then(function (user){
      if (!user) { return res.sendStatus(HttpStatus.unauthorized); }
  
      return user.unfavorite(postId).then(function(){
        return req.post.updateFavoriteCount().then(function(post){
          return res.json({post: 'Unfavorited'});
        });
      });
    }).catch(next);
  };

module.exports = {
    favorite,
    unfavorite
}