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
    text:{
        type: String,
        required: true
    },
    image:{
        type: String,
        required: true
    },
    link:{
        type: String
    }
});

module.exports = Annoucement = mongoose.model('annoucement', AnnoucementSchema);