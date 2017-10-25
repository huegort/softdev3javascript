var express = require('express');
var app = express();

app.get('/', function (req, res) {
    res.send('Hello World');
})
app.get('/car', function (req, res) {
    res.send('display all cars');
})
app.post('/car', function (req, res) {
    res.send('display all cars');
})
app.use(express.static('public'));

var server = app.listen(3003, function () {
    var host = server.address().address
    var port = server.address().port

    console.log("Example app listening at http://%s:%s", host, port)
})