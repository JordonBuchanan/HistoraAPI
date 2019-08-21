const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AnnoucementSchema = new Schema({
    admin:{
        type: Schema.Types.ObjectId,
        ref: 'admins'
    },
    title:{
        type:String,
        required: true
    },
    body:{
        type: String,
        required: true
    },
    image:{
        type: String,
        required: true
    },
    link:{
        type: String
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = Annoucement = mongoose.model('annoucement', AnnoucementSchema);