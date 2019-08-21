const mongoose = require('mongoose');
const config = require('../config');

const dbRoute = "mongodb://Jordon:Zifeco14@ds111050.mlab.com:11050/esn";
mongoose.connect(
    dbRoute,
    { useNewUrlParser: true }
);
let db = mongoose.connection;

module.exports = db;
