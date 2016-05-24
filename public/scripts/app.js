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

    // handling click on Propose Exchange also saving new exchange
    $('#add-button').on('click', handleNewExchangeSubmit);

    //i want dis button click listner
    $('#edit-exchange').on('click', handleEditExchangeClick);

    // $('#exchanges').on('click', '.edit-exchange', handleEditExchangeClick);
    $('#exchanges').on('click', '.delete-exchange', handleDeleteExchangeClick);



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
});

  function handleEditExchangeClick(e) {
    e.preventDefault();
    $('.panel-body').css('background-color', 'green');
    console.log('yay! someone clicked me!');
  }

    function handleDeleteExchangeClick(e) {
        var exchangeId = $(this).closest('button').data('exchange-id');
        console.log('someone wants to delete exchange id=' + exchangeId);
        $.ajax({
            url: '/api/exchanges/' + exchangeId,
            method: 'DELETE',
            success: handleDeleteExchangeSuccess
        });
    }

    function handleDeleteExchangeSuccess(data) {
        console.log('au revoir!', data);
        var deletedExchangeId = data._id;
        console.log('removing the following exchange from the page:', deletedExchangeId);
        $('div[data-exchange-id=' + deletedExchangeId + ']').remove();
    }


//this function will render one exchange on the page
function renderExchange(exchanges, template) {
    console.log('rendering exchange', exchanges);
    $('#exchanges').empty();
    var html = template({
        exchanges: exchanges
    });
    $('#exchanges').prepend(html);
}//closes renderExchange
// $("input[type='checkbox']").change(function() {
//     if ($(this).is(":checked")) {
//         $(this).parent().addClass("textChange");
//     } else {
//         $(this).parent().removeClass("textChange");
//     }
// });
