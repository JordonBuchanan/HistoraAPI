const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const HistoraPicksSchema = new Schema({
    admin:{
        type: Schema.Types.ObjectId,
        ref: 'admins'
    },
    image:{
        type: String,
    },
    title:{
        type:String,
        required: true
    },
    thoughts:{
        type: String,
        required: true
    },
    link:{
        type: String,
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = HistoraPicks = mongoose.model('historapicks', HistoraPicksSchema);