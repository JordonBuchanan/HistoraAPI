const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const FactSchema = new Schema({
    admin:{
        type: Schema.Types.ObjectId,
        ref: 'admins'
    },
    body:{
        type: String,
        required: true
    },
    source:{
        type: String
    }
});

module.exports = Fact = mongoose.model('facts', FactSchema);