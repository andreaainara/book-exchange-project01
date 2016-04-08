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

  db.Exchange.create(req.body, function(err, album) {
    if (err) { console.log('error', err); }
    console.log(exchange);
    res.status(200).json(exchange);
  });
}

// READ
function show() {}

// UPDATE
function update() {}


//DELETE
function destroy() {}

module.exports = {
  index: index,
  create: create,
  show: show,
  destroy: destroy,
  update: update
};
