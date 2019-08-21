const { PaperMediaModel } = require('../models');
const { AdminModel } = require('../models');
const HttpStatus = require('../HttpStatus');
const { validateToken } = require('../middleware/validateToken');

getAllPaperMedia = async(req, res) => {
    PaperMediaModel.find()
        .sort({date: -1})
        .then(papers => res.json(papers))
        .catch(err => res.status(HttpStatus.notFound).json({nopapersfound: 'No papers found'}));
};

getPaperMediaById = async(req, res) => {
    PaperMediaModel.findById(req.params.id)
        .then(paper => res.json(paper))
        .catch(err => res.status(HttpStatus.notFound).json({nopaperfound: 'No paper found'}));
};

createPaperMedia = async(req, res) => {
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
                error: 'Paper Must Be Provided',
            });
        }
        const newPaper = PaperMediaModel({
            body: req.body.data.body,
            source: req.body.data.source,
            author: req.body.data.author,
            link: req.body.data.link,
            title: req.body.data.title,
            image: req.body.data.image,
            admin: admin
        });
        newPaper.save()
            .then(paper => res.json(paper));
    });
};

deletePaperMedia = async(req, res) => {
    AdminModel.findById(req.body.admin.admin._id).then(function(isAdmin){
        if(!isAdmin){
            return res.sendStatus(HttpStatus.unauthorized);
        }
    })
     .then(admin => {
         PaperMediaModel.findById(req.params.id)
            .then(paper => { 
                paper.remove().then(() => res.json({ success: true }));
            });
        })
        .catch(err => res.status(HttpStatus.notFound).json({ papernotfound: 'Paper not found'}));
    };
 
 //Update Post Route
 updatePaperMedia = async(req, res) => {
    AdminModel.findById(req.body.admin.admin._id).then(function(isAdmin){
        if(!isAdmin){
            return res.sendStatus(HttpStatus.unauthorized);
        }
    })
    .then(admin => {
        PaperMediaModel.findByIdAndUpdate(req.params.id, req.body.post, function(err, updatedPaper){
            PaperMediaModel.findById(req.params.id)
                .then(paper => {
                    paper.save().then(() => res.json({ success: true }));
                })
        })
        .catch(err => res.status(HttpStatus.notFound).json({ Papernotfound: 'Paper not found'}));
    });
 };

 module.exports = {
    createPaperMedia,
    getAllPaperMedia,
    deletePaperMedia,
    getPaperMediaById,
    updatePaperMedia,
}