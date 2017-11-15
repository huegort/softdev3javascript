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
var sqlUpdate = "update students set name='updated' where id=1);";
var sqlUpdateFromObject = "insert into students set ?;";

var valuesAsArray = [2,"fred"];
var multipleValues= [
    [5,"frank"],
    [5,"Fatima"],
    [5,"Greg"],
    [4,"AliBabba"]];
var valuesAsObject = {id:3,name:"mary"};


con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
    con.query(sqlInsert, function (err, result) {
        if (err) throw err;
        console.log("row inserted "+JSON.stringify(result));
    });
    con.query(sqlInsertFromVars,valuesAsArray, function (err, result) {
        if (err) throw err;
        console.log("row inserted "+JSON.stringify(result));
    });
    con.query(sqlInsertMultiple,[multipleValues], function (err, result) {
        if (err) throw err;
        console.log("row inserted "+JSON.stringify(result));
    });
    con.query(sqlInsertFromObject,valuesAsObject, function (err, result) {
        if (err) throw err;
        console.log("row inserted "+JSON.stringify(result));
    });

});
