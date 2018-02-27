var express = require('express');
var loginRouter = require("./routes/login.js");
var userRouter = require('./routes/user')

var app = express();

app.set('view engine', 'ejs');

app.use(express.static('./public'));

app.use("/login", loginRouter);
app.use("/user", userRouter);
