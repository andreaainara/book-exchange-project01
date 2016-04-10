var mongoose = require('mongoose');
mongoose.connect("mongodb://localhost/book-exchange");

var Exchange = require('./exchange');

module.exports.Exchange = Exchange;
module.exports.Book = require('./books');
