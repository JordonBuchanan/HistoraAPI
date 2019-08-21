const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const HistoraPicksSchema = new Schema({
    admin:{
        type: Schema.Types.ObjectId,
        ref: 'admins'
    },
    video:[
        {
            videoId:{
                type: String,
                required: true
            },
            title:{
                type:String
            },
            thoughts:{
                type: String,
                required: true
            }
        }
    ],
    article:[
        {
            title:{
                type: String
            },
            link:{
                type: String,
                required: true
            },
            thoughts:{
                type: String,
                required: true
            }
        }
    ],
    figure:[
        {
            title:{
                type: String,
                required: true
            },
            link:{
                type: String,
                required: true
            },
            thoughts:{
                type: String,
                required: true
            }
        }
    ]
});

module.exports = HistoraPicks = mongoose.model('historapicks', HistoraPicksSchema);