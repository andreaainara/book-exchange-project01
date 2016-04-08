//CLIENT SIDE APP.JS


$(document).ready(function() {
  console.log('app.js loaded!');
  $.get('/api/exchanges').success(function (exchanges) {
    exchanges.forEach(function(exchange) {
      renderExchange(exchange);
    });
  });
});

//this function will render one exchange on the page
function renderExchange(exchange) {
  console.log('rendering exchange', exchange);
  var exchangeHtml = $('#exchange-template').html();
  var exchangesTemplate = Handlebars.compile(exchangeHtml);
  var html = exchangesTemplate(exchange);
  $('#exchanges').prepend(html);
}
