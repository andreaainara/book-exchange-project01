var mongoose = require('mongoose');
mongoose.connect(process.env.MONGOLAB_URI ||
    process.env.MONGOHQ_URL ||
    "mongodb://heroku_c6d1p9dn:9156ijve82jiceehe8m2vl4lfc@ds023550.mlab.com:23550/heroku_c6d1p9dn");



var Exchange = require('./exchange');

module.exports.Exchange = Exchange;
module.exports.Book = require('./books');
