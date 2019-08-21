const { BiographyModel } = require('../models');
const { AdminModel } = require('../models');
const HttpStatus = require('../HttpStatus');
const { validateToken } = require('../middleware/validateToken');

getAllBiographies = async(req, res) => {
    BiographyModel.find()
        .sort({date: -1})
        .then(biographies => res.json(biographies))
        .catch(err => res.status(HttpStatus.notFound).json({nobiographiesfound: 'No biographies found'}));
};

getBiographyById = async(req, res) => {
    BiographyModel.findById(req.params.id)
        .then(biography => res.json(biography))
        .catch(err => res.status(HttpStatus.notFound).json({nobiographyfound: 'No biography found'}));
};

createBiography = async(req, res) => {
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
                error: 'Biography Must Be Provided',
            });
        }
        const newBiography = BiographyModel({
            name: req.body.data.name,
            image: req.body.data.image,
            title: req.body.data.title,
            nationality: req.body.data.nationality,
            birthDate: req.body.data.birthDate,
            deathDate: req.body.data.deathDate,
            description: req.body.data.description,
            admin: admin
        });
        newBiography.save()
            .then(biography => res.json(biography));
    });
};

deleteBiography = async(req, res) => {
    AdminModel.findById(req.body.admin.admin._id).then(function(isAdmin){
        if(!isAdmin){
            return res.sendStatus(HttpStatus.unauthorized);
        }
    })
     .then(admin => {
        BiographyModel.findById(req.params.id)
            .then(biography => { 
                biography.remove().then(() => res.json({ success: true }));
            });
        })
        .catch(err => res.status(HttpStatus.notFound).json({ biographynotfound: 'Biography not found'}));
    };
 
 //Update Post Route
 updateBiography = async(req, res) => {
    AdminModel.findById(req.body.admin.admin._id).then(function(isAdmin){
        if(!isAdmin){
            return res.sendStatus(HttpStatus.unauthorized);
        }
    })
    .then(admin => {
        BiographyModel.findByIdAndUpdate(req.params.id, req.body.post, function(err, updatedBiography){
            BiographyModel.findById(req.params.id)
                .then(biography => {
                    biography.save().then(() => res.json({ success: true }));
                })
        })
        .catch(err => res.status(HttpStatus.notFound).json({ biographynotfound: 'biography not found'}));
    });
 };

 module.exports = {
    createBiography,
    getAllBiographies,
    deleteBiography,
    getBiographyById,
    updateBiography,
}