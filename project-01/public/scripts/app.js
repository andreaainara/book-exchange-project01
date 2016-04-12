//CLIENT SIDE APP.JS
$(document).ready(function() {
    console.log('app.js loaded!');
    var exchangesList = [];
    var source = $('#exchange-template').html();
    var template = Handlebars.compile(source);

    $.get('/api/exchanges').success(function(exchanges) {
        exchangesList = exchanges;
        renderExchange(exchanges, template);
    });

    // $('#exchange-form form').on('submit', function(e) {
    //     e.preventDefault();
    //     var formData = $(this).serialize();
    //     console.log('formData', formData);
    //     $.post('/api/exchanges', formData, function(exchanges) {
    //         console.log('exchange after POST', exchanges);
    //         renderExchange(exchanges); // rendering the server's response
    //     });
    //     $(this).trigger("reset");
    // });

    // handling click on Propose Exchange
    $('#add-button').on('click', handleNewExchangeSubmit);

    //save exchange modal save button
    // $('#saveExchange').on('click', '.addExchange', handleNewExchangeSubmit);
    $('#exchanges').on('click', '.delete-exchange', handleDeleteExchangeClick);
    $('#exchanges').on('click', 'save-exchange', handleSaveExchangeClick);


    function handleAddExchangeClick(e) {
        console.log('add-exchange clicked!');
        // // // var currentExchangeId = $(this).closest('.addExchange').data('exchange-id');
        // // // console.log('id', currentExchangeId);
        // // $('#exchangeModal').data('exchange-id', currentExchangeId);
        // $('#exchangeModal').modal();
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
            name: $exchangerNameField.val(),
            book: {
              title: $bookTitleField.val(),
              author: $authorNameField.val(),
              genre: $bookGenreField.val()
            }
        };
        console.log(dataToPost);

        //POST to SERVER
        $.post('/api/exchanges', dataToPost, function(data) {
            console.log('received data from post to /exchanges:', data);
            exchangesList.push(data);
            // clear form
            $exchangerNameField.val();
            $bookTitleField.val();
            $authorNameField.val();
            $bookGenreField.val();

            renderExchange(exchangesList, template);
        });

        $('#myModal').modal('hide');

      }

      // function handleSaveExchangeClick(exchangeId) {
      //
      // }


        //callback after DELETE /api/exchanges/:is

        // update the exchanges list


    function handleDeleteExchangeClick(e) {
      var exchangeId = $(this).closest('button').data('exchange-id');
      console.log('someone wants to delete exchange id=' + exchangeId);
      $.ajax({
        url: '/api/exchanges/' + exchangeId,
        method: 'DELETE',
        success: handleDeleteExchangeSuccess
      });
    }
    function handleDeleteExchangeSuccess(foo) {
      console.log('poopypants', foo);
      var deletedExchangeId = data._id;
      console.log('removing the following exchange from the page:', deletedExchangeId);
      $('div[data-exchange-id=' + deletedExchangeId + ']').remove();
    }
});

//this function will render one exchange on the page
function renderExchange(exchanges, template) {
    console.log('rendering exchange', exchanges);
    $('#exchanges').empty();
    var html = template({exchanges: exchanges});
    $('#exchanges').prepend(html);
}
