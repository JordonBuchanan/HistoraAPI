const { VideosMediaModel } = require('../models');
const { AdminModel } = require('../models');
const HttpStatus = require('../HttpStatus');
const { validateToken } = require('../middleware/validateToken');

getAllVideosMedia = async(req, res) => {
    VideosMediaModel.find()
        .sort({date: -1})
        .then(videos => res.json(videos))
        .catch(err => res.status(HttpStatus.notFound).json({novideosfound: 'No videos found'}));
};

getVideosMediaById = async(req, res) => {
    VideosMediaModel.findById(req.params.id)
        .then(video => res.json(video))
        .catch(err => res.status(HttpStatus.notFound).json({novideofound: 'No video found'}));
};

createVideosMedia = async(req, res) => {
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
                error: 'Video Must Be Provided',
            });
        }
        const newVideo = VideosMediaModel({
            body: req.body.data.body,
            source: req.body.data.source,
            author: req.body.data.author,
            link: req.body.data.link,
            title: req.body.data.title,
            image: req.body.data.image,
            admin: admin
        });
        newVideo.save()
            .then(video => res.json(video));
    });
};

deleteVideosMedia = async(req, res) => {
    AdminModel.findById(req.body.admin.admin._id).then(function(isAdmin){
        if(!isAdmin){
            return res.sendStatus(HttpStatus.unauthorized);
        }
    })
     .then(admin => {
         VideosMediaModel.findById(req.params.id)
            .then(video => { 
                video.remove().then(() => res.json({ success: true }));
            });
        })
        .catch(err => res.status(HttpStatus.notFound).json({ videonotfound: 'Video not found'}));
    };
 
 //Update Post Route
 updateVideosMedia = async(req, res) => {
    AdminModel.findById(req.body.admin.admin._id).then(function(isAdmin){
        if(!isAdmin){
            return res.sendStatus(HttpStatus.unauthorized);
        }
    })
    .then(admin => {
        VideosMediaModel.findByIdAndUpdate(req.params.id, req.body.post, function(err, updatedVideo){
            VideosMediaModel.findById(req.params.id)
                .then(video => {
                    video.save().then(() => res.json({ success: true }));
                })
        })
        .catch(err => res.status(HttpStatus.notFound).json({ Videonotfound: 'video not found'}));
    });
 };

 module.exports = {
    createVideosMedia,
    getAllVideosMedia,
    deleteVideosMedia,
    getVideosMediaById,
    updateVideosMedia,
}