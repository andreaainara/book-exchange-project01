var express = require('express');

var app = express();
var bodyParser = require ('body-parser');

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/vendor', express.static(__dirname + '/bower_components'));

var controllers = require('./controllers');
/**********
 * ROUTES *
 **********/

/*
 * HTML Endpoints
 */

app.get('/', function homepage (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


/*
 * JSON API Endpoints
 */

app.get('/api', controllers.api.index);

app.get('/api/exchanges', controllers.exchange.index);
app.post('/api/exchanges', controllers.exchange.create);
// app.get('/api/books', controllers.books.index);


/**********
 * SERVER *
 **********/

// listen on port 3000
app.listen(process.env.PORT || 3000, function () {
  console.log('Express server is running on http://localhost:3000/');
});
