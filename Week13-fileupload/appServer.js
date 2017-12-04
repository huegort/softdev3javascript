var express = require('express');

var app = express();
var bodyParser = require('body-parser');

var filehandlerRouter = require('./routes/filehandler.js');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static('./public'));
app.use("/filehandler", filehandlerRouter);


var server = app.listen(3003, function () {
    var port = server.address().port

    console.log("Example app listening at :%s",  port)
})
