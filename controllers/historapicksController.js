const { HistoraPicksModel } = require('../models');
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
    const body = req.body;
    if(!body){
        return res.status(HttpStatus.badRequest).json({
            success: false,
            error: 'Histora Picks Must Be Provided',
        });
    }
    if(historapicks.admin.toString() !== req.admin.id ){
        return res.status(HttpStatus.unauthorized).json({ notauthorized: 'Admin not autherized'});
    }
    const newHistoraPicks = HistoraPicksModel({
        video: req.body.video,
        article: req.body.article,
        link: req.body.link,
    });
    newHistoraPicks.save()
        .then(historapicks => res.json(historapicks));
};
 
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