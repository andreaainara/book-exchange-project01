var mongoose = require ('mongoose');
var Schema = mongoose.Schema;

var Book = require('./books');

var ExchangeSchema = new Schema ({
  name: String,
  book: [Book.schema]
});

var Exchange = mongoose.model('Exchange', ExchangeSchema);
module.exports = Exchange;
