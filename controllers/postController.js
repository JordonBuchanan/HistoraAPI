const { PostModel } = require('../models');
const { AdminModel } = require('../models');
const HttpStatus = require('../HttpStatus');
const { validateToken } = require('../middleware/validateToken');

getAllPosts = async(req, res) => {
    PostModel.find()
        .sort({date: -1})
        .then(posts => res.json(posts))
        .catch(err => res.status(HttpStatus.notFound).json({nopostsfound: 'No posts found'}));
};

getPostById = async(req, res) => {
    PostModel.findById(req.params.id)
        .then(post => res.json(post))
        .catch(err => res.status(HttpStatus.notFound).json({nopostfound: 'No post found'}));
};

createPost = async(req, res) => {
    AdminModel.findById(req.body.admin.admin._id).then(function(isAdmin){
        if(!isAdmin){
            return res.sendStatus(HttpStatus.unauthorized);
        }
        let admin ={
            id: req.body.admin.admin._id,
            name: req.body.admin.admin.name,
            email: req.body.admin.admin.email,
            avatar: req.body.admin.admin.avatar
        }

        const body = req.body;
        if(!body){
            return res.status(HttpStatus.badRequest).json({
                success: false,
                error: 'Post Must Be Provided',
            });
        }
        const newPost = PostModel({
            body: req.body.body,
            title: req.body.title,
            image: req.body.image,
            admin: admin
        });
        newPost.save()
            .then(post => res.json(post));
    });
};

deletePost = async(req, res) => {
    AdminModel.findById(req.body.admin.admin._id).then(function(isAdmin){
        if(!isAdmin){
            return res.sendStatus(HttpStatus.unauthorized);
        }
    })
     .then(admin => {
         PostModel.findById(req.params.id)
            .then(post => { 
                post.remove()
                .then(() => res.json({ success: true }));
            });
        })
        .catch(err => res.status(HttpStatus.notFound).json({ postnotfound: 'Post not found'}));
    };
 
 //Update Post Route
updatePost = async(req, res) => {
    AdminModel.findById(req.body.admin.admin._id).then(function(isAdmin){
        if(!isAdmin){
            return res.sendStatus(HttpStatus.unauthorized);
        }
    })
    .then(admin => {
        PostModel.findByIdAndUpdate(req.params.id, req.body.post, function(err, updatedPost){
            PostModel.findById(req.params.id)
                .then(post => {
                    post.save().then(() => res.json({ success: true }));
                })
        })
        .catch(err => res.status(HttpStatus.notFound).json({ postnotfound: 'Post not found'}));
    });
 };

 module.exports = {
    createPost,
    getAllPosts,
    deletePost,
    getPostById,
    updatePost,
}