var mysql = require('mysql');
var sqlGetAll= "select * from students;";

var studentDAO={
    con:mysql.createConnection({
        host:'localhost',
        user:'root',
        password:'',
        database:'softdev3',
    }),
    getAll:function(callback) {
        this.con.connect(function (err) {
            if (err) throw err;
            console.log("Connected!");
            studentDAO.con.query(sqlGetAll, function (err, result) {
                if (err) throw err;
                console.log("getAll: " + JSON.stringify(result));
                callback(result);
            });
        });
    }

}


module.exports= studentDAO;