//CLIENT SIDE APP.JS


$(document).ready(function() {
    console.log('app.js loaded!');
    $.get('/api/exchanges').success(function(exchanges) {
        exchanges.forEach(function(exchange) {
            renderExchange(exchange);
        });
    });
    $('#exchang-form form').on('submit', function(e) {
        e.preventDefault();
        var formData = $(this).serialize();
        $.post('/api/exchanges', formData, function(exchange) {
            console.log('exchange after POST', exchange);
            renderExchange(exchange); // rendering the server's response
        });
        $(this).trigger("reset");
    });

    // handling click on Propose Exchange
    $('#exchanges').on('click', '.addExchange', handleAddExchangeClick);

    //save exchange modal save button
    $('#saveExchange').on('click', handleNewExchangeSubmit);
    // $('#exchanges').on('click', '.delete-exchange', handleDeleteAlbumClick);
    // $('#exchanges').on('click', '.edit-exchange', handleExchangeEditClick);
    // $('exchanges').on('click', 'save-album', handleSaveExchangesClick);


    function handleAddExchangeClick(e) {
        console.log('add-exchange clicked!');
        var currentExchangeId = $(this).closest('.addExchange').data('exchange-id');
        console.log('id', currentExchangeId);
        $('#exchangeModal').data('exchange-id', currentExchangeId);
        $('#exchangeModal').modal();
    }

    // when the exchange modal submit button is clicked
    function handleNewExchangeSubmit(e) {
        e.preventDefault();
        var $modal = $('#exchangeModal');
        var $exchangerNameField = $modal.find('#exchangerName');
        var $bookTitleField = $modal.find('#bookTitle');
        var $authorNameField = $modal.find('#authorName');
        var $bookGenreField = $modal.find('#bookGenre');

        // get data from modal fields
        var dataToPost = {
            exchangerName: $exchangerNameField.val(),
            bookTitle: $bookTitleField.val(),
            authorName: $authorNameField.val(),
            bookGenre: $bookGenreField.val()
        };
        var exchangeId = $modal.data('exchangeId');
        console.log('retrieved exchangerName:', exchangerName, ' and bookTitle:', bookTitle, ' and authorName:', authorName, 'and bookGenre:', bookGenre, 'for exchange w/ id: ', exchangeId);
        //POST to SERVER
        var exchangePostToServerUrl = '/api/exchanges' + exchangeId;
        $.post(exchangePostToServerUrl, dataToPost, function(data) {
            console.log('received data from post to /exchanges:', data);
            // clear form
            $exchangerNameField.val();
            $bookTitleField.val();
            $authorNameField.val();
            $bookGenreField.val();
        });
        // update the exchanges list
        $.get('/api/exchanges/' + exchangeId, function(data) {
            // remove current instance of the exchange from the page
            $('[data-exchange-id=' + exchangeId + ']').remove();
            //re-render with new exchange
            renderExchange(data);
        }).error(function(err) {
            console.log('post to /api/exchanges/:exchangeId resulted in error', err);
        });
    }
});

//this function will render one exchange on the page
function renderExchange(exchange) {
    console.log('rendering exchange', exchange);
    var exchangeHtml = $('#exchange-template').html();
    var exchangesTemplate = Handlebars.compile(exchangeHtml);
    var html = exchangesTemplate(exchange);
    $('#exchanges').prepend(html);
}
