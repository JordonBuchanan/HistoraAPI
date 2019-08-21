const { PostModel, UserModel, AdminModel } = require('../models');
const HttpStatus = require('../HttpStatus');
const { validateToken } = require('../middleware/validateToken');

Like = async(req, res) => {
    AdminModel.findOne(req.body.admin)
     .then(admin => {
         PostModel.findById(req.body.body)
            .then(post => {
            if(post.likes.filter(like => like.admin.toString() === req.body.admin.admin._id).length > 0){
             return res.status(HttpStatus.badRequest).json({ alreadyliked: 'User already liked this post'});
            }
            post.likes.unshift(req.body.admin.admin._id);
            post.save().then(post => res.json(post));
             })
             .catch(err => res.status(HttpStatus.notFound).json({ postnotfound: 'Post not found'}));
     });
 };
 
 //Unlike a Post Route
Unlike = async(req, res) => {
    UserModel.findOne({ user: req.user.id })
     .then(user => {
         PostModel.findById(req.params.id)
             .then(post => {
            if(post.likes.filter(like => like.user.toString() === req.user.id).length === 0){
             return res.status(HttpStatus.badRequest).json({ notliked: 'You have notliked this post'});
            }
            const removeIndex = post.likes
             .map(item => item.user.toString())
             .indexOf(reg.user.id);
            post.likes.splice(removeIndex, 1);
            post.save().then(post =>res.json(post));
             })
             .catch(err => res.status(HttpStatus.notFound).json({ postnotfound: 'Post not found'}));
     });
 };
 
 module.exports = {
     Like,
     Unlike,
 }