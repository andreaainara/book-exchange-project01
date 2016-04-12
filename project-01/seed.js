var db = require("./models");

var exchangesList = [];
exchangesList.push({
  name: 'Jane Doe',
  book: [{
    title: 'The Shape of the Water',
    author: 'Andrea Camilleri',
    genre: ['mystery', 'crime']
  }]
});
exchangesList.push({
  name: 'John Smith',
  book: [{
    title: 'The Shining Girls',
    author: 'Lauren Beukes',
    genre: ['crime', 'mystery', 'suspense', 'thriller']
  }]
});

db.Exchange.remove({}, function(err, exchanges){

  db.Exchange.create(exchangesList,function(err, exchanges){
    if (err) { return console.log('ERROR', err); }
    console.log("all exchanges:", exchanges);
    console.log("created", exchanges.length, "exchanges");
    // console.log(exchanges[0].book)
    console.log(exchanges[0].book);
    process.exit();
  });
});
