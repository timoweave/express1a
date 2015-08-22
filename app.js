
var express = require('express');
var body_parser = require('body-parser');

var app = express();

app.set('views', __dirname + '/templates');
app.set('view engine', 'ejs');

app.use(express.static(__dirname + "/public"));
app.use(body_parser.urlencoded({ extended: false }));
app.use(body_parser.json());

app.get('/', function(request, response) {
    response.render('index', {title: "Survey"});
});

app.post('/result', function(request, response) {
    console.log(request.body);
    var data = request.body;
    data.title = "Submitted Information";
    response.render('result', data);
});

var server = app.listen(8000);
console.log('localhost:8000')

var io = require('socket.io').listen(server);

io.sockets.on('connection', function(socket) {

    socket.on('posting_form', function(data) {
        console.log(data);

        var message = { message : "You emitted the following information to the server : " + data };
        var number = { number : Math.min(1, Math.round(Math.random()*1000)) };
        console.log(message);
        console.log(number);
        socket.emit("update_message", message);
        socket.emit("random_number", number);
    });
});
