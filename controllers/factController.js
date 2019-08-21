const { FactModel } = require('../models');
const HttpStatus = require('../HttpStatus');
const { validateToken } = require('../middleware/validateToken');

getAllFacts = async(req, res) => {
    FactModel.find()
        .sort({date: -1})
        .then(facts => res.json(facts))
        .catch(err => res.status(HttpStatus.notFound).json({nofactsfound: 'No facts found'}));
};

getFactById = async(req, res) => {
    FactModel.findById(req.params.id)
        .then(fact => res.json(fact))
        .catch(err => res.status(HttpStatus.notFound).json({nofactfound: 'No fact found'}));
};

createFact = async(req, res) => {
    const body = req.body;
    if(!body){
        return res.status(HttpStatus.badRequest).json({
            success: false,
            error: 'Video Must Be Provided',
        });
    }
    if(fact.admin.toString() !== req.admin.id ){
        return res.status(HttpStatus.unauthorized).json({ notauthorized: 'Admin not autherized'});
    }
    const newFact = FactModel({
        body: req.body.body,
        source: req.body.source,
    });
    newFact.save()
        .then(fact => res.json(fact));
};

deleteFact = async(req, res) => {
    FactModel.findOne({ admin: req.admin.id })
     .then(video => {
         FactModel.findById(req.params.id)
             .then(fact => {
                if(fact.admin.toString() !== req.admin.id ){
                    return res.status(HttpStatus.unauthorized).json({ notauthorized: 'Admin not autherized'});
                }
                fact.remove().then(() => res.json({ success: true }));
             })
             .catch(err => res.status(HttpStatus.notFound).json({ postfactfound: 'Fact not found'}));
     });
 };
 
 //Update Post Route
updateFact = async(req, res) => {
    FactModel.findByIdAndUpdate(req.params.id, req.body.fact, function(err, updatedFact){
        FactModel.findById(req.params.id)
             .then(fact => {
                if(fact.admin.toString() !== req.admin.id ){
                    return res.status(HttpStatus.unauthorized).json({ notauthorized: 'Admin not autherized'});
                }
                fact.save().then(() => res.json({ success: true }));
             })
             .catch(err => res.status(HttpStatus.notFound).json({ factnotfound: 'Fact not found'}));
     });
 };

 module.exports = {
    createFact,
    getAllFacts,
    deleteFact,
    getFactById,
    updateFact,
}