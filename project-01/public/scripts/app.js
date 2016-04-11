//CLIENT SIDE APP.JS
$(document).ready(function() {
    console.log('app.js loaded!');

    var source = $('#exchange-template').html();
    template = Handlebars.compile(source);


    $.get('/api/exchanges').success(function(exchanges) {
            renderExchange(exchanges);
    });

    $('#exchange-form form').on('submit', function(e) {
        e.preventDefault();
        var formData = $(this).serialize();
        console.log('formData', formData);
        $.post('/api/exchanges', formData, function(exchanges) {
            console.log('exchange after POST', exchanges);
            renderExchange(exchanges); // rendering the server's response
        });
        $(this).trigger("reset");
    });

    // handling click on Propose Exchange
    $('#exchanges').on('click', '.addExchange', handleAddExchangeClick);

    //save exchange modal save button
    $('#saveExchange').on('click', handleNewExchangeSubmit);
    $('#exchanges').on('click', '.delete-exchange', handleDeleteAlbumClick);
    // $('#exchanges').on('click', '.edit-exchange', handleExchangeEditClick);
    $('#exchanges').on('click', 'save-exchange', handleSaveExchangesClick);


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
        console.log('retrieved exchangerName:', name, ' and bookTitle:', title, ' and authorName:', authorName, 'and bookGenre:', genre, 'for exchange w/ id: ', exchangeId);
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
function renderExchange(exchanges) {
    console.log('rendering exchange', exchanges);
    var html = template({exchanges: exchanges});
    $('#exchanges').prepend(html);
}
