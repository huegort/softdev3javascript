var express = require('express');
var app = express();
var bodyParser = require('body-parser');

var carRouter = require('./routes/Car.js');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static('public'));
app.use("/car", carRouter);


var server = app.listen(3003, function () {
    var host = server.address().address
    var port = server.address().port

    console.log("Example app listening at http://%s:%s", host, port)
})