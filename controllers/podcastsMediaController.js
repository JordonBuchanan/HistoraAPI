const { PodcastsMediaModel } = require('../models');
const { AdminModel } = require('../models');
const HttpStatus = require('../HttpStatus');
const { validateToken } = require('../middleware/validateToken');

getAllPodcastsMedia = async(req, res) => {
    PodcastsMediaModel.find()
        .sort({date: -1})
        .then(podcasts => res.json(podcasts))
        .catch(err => res.status(HttpStatus.notFound).json({nopodcastsfound: 'No podcasts found'}));
};

getPodcastsMediaById = async(req, res) => {
    PodcastsMediaModel.findById(req.params.id)
        .then(podcast => res.json(podcast))
        .catch(err => res.status(HttpStatus.notFound).json({nopodcastfound: 'No podcast found'}));
};

createPodcastsMedia = async(req, res) => {
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
                error: 'Podcast Must Be Provided',
            });
        }
        const newPodcast = PodcastsMediaModel({
            body: req.body.data.body,
            source: req.body.data.source,
            author: req.body.data.author,
            link: req.body.data.link,
            title: req.body.data.title,
            image: req.body.data.image,
            admin: admin
        });
        newPodcast.save()
            .then(podcast => res.json(podcast));
    });
};

deletePodcastsMedia = async(req, res) => {
    AdminModel.findById(req.body.admin.admin._id).then(function(isAdmin){
        if(!isAdmin){
            return res.sendStatus(HttpStatus.unauthorized);
        }
    })
     .then(admin => {
         PodcastsMediaModel.findById(req.params.id)
            .then(podcast => { 
                podcast.remove().then(() => res.json({ success: true }));
            });
        })
        .catch(err => res.status(HttpStatus.notFound).json({ podcastnotfound: 'Podcast not found'}));
    };
 
 //Update Post Route
 updatePodcastsMedia = async(req, res) => {
    AdminModel.findById(req.body.admin.admin._id).then(function(isAdmin){
        if(!isAdmin){
            return res.sendStatus(HttpStatus.unauthorized);
        }
    })
    .then(admin => {
        PodcastsMediaModel.findByIdAndUpdate(req.params.id, req.body.post, function(err, updatedPodcast){
            PodcastsMediaModel.findById(req.params.id)
                .then(podcast => {
                    podcast.save().then(() => res.json({ success: true }));
                })
        })
        .catch(err => res.status(HttpStatus.notFound).json({ Podcastnotfound: 'Podcast not found'}));
    });
 };

 module.exports = {
    createPodcastsMedia,
    getAllPodcastsMedia,
    deletePodcastsMedia,
    getPodcastsMediaById,
    updatePodcastsMedia,
}