const { PostModel, AdminModel } = require('../models');
const HttpStatus = require('../HttpStatus');
const { validateToken } = require('../middleware/validateToken');

commentPost = async (req,res ) => {
    AdminModel.findById(req.body.data.admin.admin._id).then(function(isAdmin){
        if(!isAdmin){
            return res.sendStatus(HttpStatus.unauthorized);
        }
        let admin ={
            id: req.body.data.admin.admin._id,
            name: req.body.data.admin.admin.name,
            email: req.body.data.admin.admin.email,
            avatar: req.body.data.admin.admin.avatar
        }

        const body = req.body;
        if(!body){
            return res.status(HttpStatus.badRequest).json({
                success: false,
                error: 'Comment Must Be Provided',
            });
        }
        console.log(req.body.data)
    PostModel.findById(req.body.data.id)
        .then(post => {
            const newComment = {
                body: req.body.data.body,
                image: req.body.data.image,
                admin: admin
            }
            post.comments.unshift(newComment);
            post.save().then(post => res.json(post))
        })
        .catch(err => res.status(HttpStatus.notFound).json({ postnotfound: 'No post found'}));
    });
}
//Delete Comment
commentDelete = async (req,res ) => {
    PostModel.findById(req.params.id)
        .then(post => {
            if(post.comments.filter(comment => comment._id.toString() === req.params.comment_id).length === 0){
                return res.status(HttpStatus.notFound).json({ commentnotfound: 'comment not found!'});
            }
            const removeIndex = post.comments
                .map(item => item._id.toString())
                .indexOf(req.params.comment_id);
                post.comments.splice(removeIndex, 1);
                post.save().then(post => res.json(post));
        })
        .catch(err => res.status(HttpStatus.notFound).json({ postnotfound: 'No post found'}));
};

module.exports = {
    commentPost,
    commentDelete
}
