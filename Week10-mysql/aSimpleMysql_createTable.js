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
    var sql = "create table blah (id int, name varchar(250));";
    con.query(sql, function(err,result){
        if (err){
            console.log(JSON.stringify(err.sqlMessage));
            console.log("SQL:"+err.sql);
            throw err;
        }
        console.log(JSON.stringify(result));
    });
});
console.log("yo");