
var mysql = require('mysql');

var con = mysql.createConnection({
    host:'localhost',
    user:"root",
    password:'',
    database:'softdev3'
});

var sql ="delete from students where id = ?";
var idToDelete = 1;

con.connect(function(err){
    if (err){
        throw err;
    };
    con.query(sql, [idToDelete],function(err, result){
       if (err){
           console.log(err.sql);
           throw err;
       }
       console.log(JSON.stringify(result));
    });
});