const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const VideoSchema = new Schema({
    admin:{
        type: Schema.Types.ObjectId,
        ref: 'admins'
    },
    title:{
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    link:{
        type: String,
        required: true
    },
    favoritesCount:{
        type: Number,
        default: 0
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = Video = mongoose.model('videos', VideoSchema);