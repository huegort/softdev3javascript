/*
To use this you need to have:
1. The NPM mysql package installed
    npm install mysql
2. A mysql database running (eg mysql)

 */
var mysql = require('mysql');
var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database:"softdev3"
});
var sqlCreate = "create table students (id int, name varchar(250));";


con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
    con.query(sqlCreate, function (err, result) {
        if (err) throw err;
        console.log("Table created");
    });



});