const { AnnoucementModel, AdminModel } = require('../models');
const HttpStatus = require('../HttpStatus');
const { validateToken } = require('../middleware/validateToken');

getAllAnnoucements = async(req, res) => {
    AnnoucementModel.find()
        .sort({date: -1})
        .then(annoucements => res.json(annoucements))
        .catch(err => res.status(HttpStatus.notFound).json({noannoucementsfound: 'No annoucements found'}));
};

getAnnoucementById = async(req, res) => {
    AnnoucementModel.findById(req.params.id)
        .then(annoucement => res.json(annoucement))
        .catch(err => res.status(HttpStatus.notFound).json({noannoucementfound: 'No annoucement found'}));
};

createAnnoucement = async(req, res) => {
    AdminModel.findById(req.body.admin.admin._id).then(function(isAdmin){
        if(!isAdmin){
            return res.sendStatus(HttpStatus.unauthorized);
        }
        const body = req.body;
        if(!body){
            return res.status(HttpStatus.badRequest).json({
                success: false,
                error: 'Annoucement Must Be Provided',
            });
        }
        const newAnnoucement = AnnoucementModel({
            body: req.body.data.body,
            title: req.body.data.title,
            image: req.body.data.image,
            link: req.body.data.link,
            admin:req.body.admin.admin._id
        });
        newAnnoucement.save()
            .then(annoucement => res.json(annoucement));
    });
};

deleteAnnoucement = async(req, res) => {
    AnnoucementModel.findOne({ admin: req.admin.id })
     .then(annoucement => {
         AnnoucementModel.findById(req.params.id)
             .then(annoucement => {
                if(annoucement.admin.toString() !== req.admin.id ){
                    return res.status(HttpStatus.unauthorized).json({ notauthorized: 'Admin not autherized'});
                }
                annoucement.remove().then(() => res.json({ success: true }));
             })
             .catch(err => res.status(HttpStatus.notFound).json({ postannoucementfound: 'Annoucement not found'}));
     });
 };
 
 //Update Post Route
updateAnnoucement = async(req, res) => {
    AnnoucementModel.findByIdAndUpdate(req.params.id, req.body.annoucement, function(err, updatedAnnoucement){
        AnnoucementModel.findById(req.params.id)
             .then(annoucement => {
                if(annoucement.admin.toString() !== req.admin.id ){
                    return res.status(HttpStatus.unauthorized).json({ notauthorized: 'Admin not autherized'});
                }
                annoucement.save().then(() => res.json({ success: true }));
             })
             .catch(err => res.status(HttpStatus.notFound).json({ annoucementnotfound: 'Annoucement not found'}));
     });
 };

 module.exports = {
    createAnnoucement,
    getAllAnnoucements,
    deleteAnnoucement,
    getAnnoucementById,
    updateAnnoucement,
}