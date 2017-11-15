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
var sqlUpdate = "update students set name='updated' where id=1;";
var sqlUpdateFromObject = "update students set ? where id = ?;";

student = {id:3, name:"updated mary"};
con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
    con.query(sqlUpdate, function (err, result) {
        if (err) throw err;
        console.log("row updated "+JSON.stringify(result));
    });
    con.query(sqlUpdateFromObject,[student, student.id], function (err, result) {
        if (err) throw err;
        console.log("row update from obj "+JSON.stringify(result));
    });

});
