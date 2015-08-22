$(document).ready(function() {
    var socket = io.connect();

    $('#feedback').hide();

    $('#submit-button').click(function() {
        var data = { name : $('#fullname-input').val(),
                     location : $('#location-select').val(),
                     language : $('#language-select').val(),
                     email :  $('#e-mail-input').val(),
                     comment : $('#comment-box').val()
                   };
        console.log(data);
        socket.emit("posting_form", data);
    });

    socket.on("update_message", function(data) {
        console.log(data);
        $('#update-message').text(data.message);
        $('#feedback').show();
        
    });

    socket.on("random_number", function(data) {
        console.log(data);
        $('#random-number').text("Your lucky number emitted by the server is " + data.number + ".");
        $('#feedback').show();
    });
});
