var express = require('express');
var session = require('express-session');

var userRouter = require('./routes/user.js');
var testSessionRouter = require('./routes/testSession.js');

var app = express();
var bodyParser = require('body-parser');
app.use(session({
    secret: 'work hard',
    resave: true,
    saveUninitialized: false
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.all('/welcome.html', function(req,res, next){
    console.log("checking welcome");
    if (req.session && req.session.check){
        next();
    }else{
        res.redirect('/login.html');
    }
})

app.use(express.static('./public'));

// filter to check login
app.use("/user", userRouter);
app.use("/testSession", testSessionRouter);


var server = app.listen(3003, function () {
    var port = server.address().port

    console.log("Example app listening at :%s",  port)
})
