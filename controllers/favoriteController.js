const { PostModel } = require('../models');
const { UserModel } = require('../models');
const { AdminModel } = require('../models');
const HttpStatus = require('../HttpStatus');
const { validateToken } = require('../middleware/validateToken');

favorite = async(req, res, next) => {
    var payload = req.body.body;
    //var id = req.body.body._id;
    //var title = req.body.body.title;
    //var link = req.body.body.link;
    AdminModel.findById(req.body.admin.admin._id).then(function(user){
      if (!user) { 
        return res.sendStatus(HttpStatus.unauthorized); 
      }
  
      return user.favorite(payload).then(function(post){
        return res.json({post: "Added"});
    }).catch(next);
  });
};
  
 unfavorite = async(req, res, next) => {
    var postId = req.body.body;
  
    AdminModel.findById(req.body.admin.admin._id).then(function (user){
      if (!user) { 
        return res.sendStatus(HttpStatus.unauthorized); 
      }
  
      return user.unfavorite(postId).then(function(){
          return res.json({post: 'Unfavorited'});
      });
    }).catch(next);
  };

module.exports = {
    favorite,
    unfavorite
}