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

var sqlGetAll = "select * from students;";
var sqlFindByid = "select * from students where id = ?;";

var idToFind = 3;


con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
    con.query(sqlGetAll, function (err, result) {
        if (err) throw err;
        console.log("getAll: "+JSON.stringify(result));
    });
    con.query(sqlFindByid,[idToFind], function (err, result) {
        if (err) throw err;
        console.log("findById: "+JSON.stringify(result));
    });



});