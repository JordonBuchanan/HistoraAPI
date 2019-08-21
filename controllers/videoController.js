const { VideoModel } = require('../models');
const HttpStatus = require('../HttpStatus');
const { validateToken } = require('../middleware/validateToken');

getAllVideos = async(req, res) => {
    VideoModel.find()
        .sort({date: -1})
        .then(videos => res.json(videos))
        .catch(err => res.status(HttpStatus.notFound).json({novideosfound: 'No videos found'}));
};

getVideoById = async(req, res) => {
    VideoModel.findById(req.params.id)
        .then(video => res.json(video))
        .catch(err => res.status(HttpStatus.notFound).json({novideofound: 'No video found'}));
};

createVideo = async(req, res) => {
    const body = req.body;
    if(!body){
        return res.status(HttpStatus.badRequest).json({
            success: false,
            error: 'Video Must Be Provided',
        });
    }
    if(video.admin.toString() !== req.admin.id ){
        return res.status(HttpStatus.unauthorized).json({ notauthorized: 'Admin not autherized'});
    }
    const newVideo = VideoModel({
        title: req.body.title,
        description: req.body.description,
        link: req.body.link,
    });
    newVideo.save()
        .then(video => res.json(video));
};

deleteVideo = async(req, res) => {
    VideoModel.findOne({ user: req.user.id })
     .then(video => {
         VideoModel.findById(req.params.id)
             .then(video => {
                if(video.admin.toString() !== req.admin.id ){
                    return res.status(HttpStatus.unauthorized).json({ notauthorized: 'Admin not autherized'});
                }
                video.remove().then(() => res.json({ success: true }));
             })
             .catch(err => res.status(HttpStatus.notFound).json({ postvideofound: 'Video not found'}));
     });
 };
 
 //Update Post Route
updateVideo = async(req, res) => {
    VideoModel.findByIdAndUpdate(req.params.id, req.body.video, function(err, updatedVideo){
        VideoModel.findById(req.params.id)
             .then(video => {
                if(video.admin.toString() !== req.admin.id ){
                    return res.status(HttpStatus.unauthorized).json({ notauthorized: 'Admin not autherized'});
                }
                video.save().then(() => res.json({ success: true }));
             })
             .catch(err => res.status(HttpStatus.notFound).json({ videonotfound: 'Video not found'}));
     });
 };

 module.exports = {
    createVideo,
    getAllVideos,
    deleteVideo,
    getVideoById,
    updateVideo,
}