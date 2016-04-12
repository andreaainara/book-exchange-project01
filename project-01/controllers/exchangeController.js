/************
 * DATABASE *
 ************/

var db = require('../models');

// GET /api/exchanges
function index(req, res) {
  db.Exchange.find({}, function(err, allExchanges) {
    res.status(200).json(allExchanges);
  });
}

// CREATE
function create(req, res) {
  console.log('body', req.body);
  console.log(req.body.book.genre);

  // split at comma and remove and trailing space
  var genres = req.body.book.genre.split(', ').map(function(item) { return item.trim(); } );
  req.body.book.genre = genres;

  db.Exchange.create(req.body, function(err, exchange) {
    if (err) { console.log('error', err); }
    console.log(exchange);
    db.Exchange.save();
    res.status(200).json(exchange);
  });
}

// READ
function show(req, res) {
  db.Exchange.findById(req.params.exchangeId, function(err, foundExchange) {
    if(err) { console.log('exchangeController.show error', err); }
    console.log('exchangeController.show responding with', foundExchange);
    res.status(200).json(foundExchange);
  });
}

// UPDATE
function update(req, res) {
  console.log('updating with data', req.body);
  db.Exchange.findById(req.params.exchangeId, function(err, foundExchange) {
    if(err) { console.log('exchangeController.update error', err); }
    foundExchange.name = req.body.name;
    foundExchange.book = req.body.book; // Still not entirely sure if this is necessary due to the foundation of the data
    foundExchange.save(function(err, savedExchange) {
      if(err) { console.log('saving altered exchange failed'); }
      res.status(200).json(savedExchange);
    });
  });
}


//DELETE
function destroy(req, res) {
  db.Exchange.findOneAndRemove({ _id: req.params.exchangeId }, function(err, foundExchange){
    res.status(204).send();
  });
}

module.exports = {
  index: index,
  create: create,
  show: show,
  destroy: destroy,
  update: update
};
