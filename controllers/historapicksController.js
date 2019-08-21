const { HistoraPicksModel, AdminModel } = require('../models');
const HttpStatus = require('../HttpStatus');
const { validateToken } = require('../middleware/validateToken');

getAllHistoraPicks = async(req, res) => {
    HistoraPicksModel.find()
        .sort({date: -1})
        .then(historapicks => res.json(historapicks))
        .catch(err => res.status(HttpStatus.notFound).json({nohistorapickssfound: 'No histora picks found'}));
};

getHistoraPicksById = async(req, res) => {
    HistoraPicksModel.findById(req.params.id)
        .then(historapicks => res.json(historapicks))
        .catch(err => res.status(HttpStatus.notFound).json({nohistorapicksfound: 'No histora picks found'}));
};

createHistoraPicks = async(req, res) => {
    AdminModel.findById(req.body.admin.admin._id).then(function(isAdmin){
        if(!isAdmin){
            return res.sendStatus(HttpStatus.unauthorized);
        }
        const body = req.body;
        if(!body){
            return res.status(HttpStatus.badRequest).json({
                success: false,
                error: 'Pick Must Be Provided',
            });
        }
        const newHistoraPicks = HistoraPicksModel({
            video: req.body.data.video,
            article: req.body.data.article,
            link: req.body.data.link,
            admin:req.body.admin.admin._id
        });
        newHistoraPicks.save()
            .then(historapicks => res.json(historapicks));
    });
}
 
 //Update Post Route
updateHistoraPicks = async(req, res) => {
    HistoraPicksModel.findByIdAndUpdate(req.params.id, req.body.historapicks, function(err, updatedHistoraPicks){
        HistoraPicksModel.findById(req.params.id)
             .then(historapicks => {
                if(historapicks.admin.toString() !== req.admin.id ){
                    return res.status(HttpStatus.unauthorized).json({ notauthorized: 'Admin not autherized'});
                }
                historapicks.save().then(() => res.json({ success: true }));
             })
             .catch(err => res.status(HttpStatus.notFound).json({ historapicksnotfound: 'Histora picks not found'}));
     });
 };

 module.exports = {
    getAllHistoraPicks,
    createHistoraPicks,
    getHistoraPicksById,
    updateHistoraPicks,
}