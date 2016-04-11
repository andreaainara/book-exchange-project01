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

  // split at comma and remove and trailing space
  var genres = req.body.genres.split(', ').map(function(item) { return item.trim(); } );
  req.body.genres = genres;

  db.Exchange.create(req.body, function(err, album) {
    if (err) { console.log('error', err); }
    console.log(exchange);
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
