const { PodcastModel } = require('../models');
const HttpStatus = require('../HttpStatus');
const { validateToken } = require('../middleware/validateToken');

getAllPodcasts = async(req, res) => {
    PodcastModel.find()
        .sort({date: -1})
        .then(podcasts => res.json(podcasts))
        .catch(err => res.status(HttpStatus.notFound).json({nopodcastsfound: 'No podcasts found'}));
};

getPodcastById = async(req, res) => {
    PodcastModel.findById(req.params.id)
        .then(podcast => res.json(podcast))
        .catch(err => res.status(HttpStatus.notFound).json({nopodcastfound: 'No podcast found'}));
};

createPodcast = async(req, res) => {
    const body = req.body;
    if(!body){
        return res.status(HttpStatus.badRequest).json({
            success: false,
            error: 'Podcast Must Be Provided',
        });
    }
    if(podcast.admin.toString() !== req.admin.id ){
        return res.status(HttpStatus.unauthorized).json({ notauthorized: 'Admin not autherized'});
    }
    const newPodcast = PodcastModel({
        title: req.body.title,
        description: req.body.description,
        link: req.body.link,
    });
    newPodcast.save()
        .then(podcast => res.json(podcast));
};

deletePodcast = async(req, res) => {
    PodcastModel.findOne({ user: req.user.id })
     .then(podcast => {
         PodcastModel.findById(req.params.id)
             .then(podcast => {
                if(podcast.admin.toString() !== req.admin.id ){
                    return res.status(HttpStatus.unauthorized).json({ notauthorized: 'Admin not autherized'});
                }
                 podcast.remove().then(() => res.json({ success: true }));
             })
             .catch(err => res.status(HttpStatus.notFound).json({ podcastnotfound: 'Podcast not found'}));
     });
 };
 
 //Update Post Route
updatePodcast = async(req, res) => {
    PodcastModel.findByIdAndUpdate(req.params.id, req.body.podcast, function(err, updatedPodcast){
        PodcastModel.findById(req.params.id)
             .then(podcast => {
                if(podcast.admin.toString() !== req.admin.id ){
                    return res.status(HttpStatus.unauthorized).json({ notauthorized: 'Admin not autherized'});
                }
                 podcast.save().then(() => res.json({ success: true }));
             })
             .catch(err => res.status(HttpStatus.notFound).json({ podcastnotfound: 'Podcast not found'}));
     });
 };

 module.exports = {
    createPodcast,
    getAllPodcasts,
    deletePodcast,
    getPodcastById,
    updatePodcast,
}