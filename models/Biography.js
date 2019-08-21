const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const BiographySchema = new Schema({
    admin:{
        id:{
            type: Schema.Types.ObjectId,
            ref: 'admins'
        },
        name: String,
        email: String,
        avatar: String
        },
        name:{
            type: String,
            required: true
        },
        image:{
            type: String,
            required: true
        },
        title: {
            type: String,
            required: true
        },
        nationality:{ 
            type: String,
            required: true
        },
        birthDate:{
             type: String,
             required: true
        },
        deathDate: {
            type: String,
            required: true
        },
        description:{
            type: String,
            required: true
        },
    },
    { 
        timestamps: true 
    }
);

module.exports = Biography = mongoose.model("biographies", BiographySchema);