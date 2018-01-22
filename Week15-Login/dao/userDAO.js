var mysql = require('mysql');


var userDAO= {
    INSERT_SQL: "insert into user (username, password) values (? , md5(?) );",
    GETALL_SQL: "select * from user;",
    FINDBYUSERNAME_SQL: "select * from user where username = ?;",
    UPDATE_SQL: "update user set password = ? where username = ?;",
    DELETE_SQL: "delete from user  where username = ?;",
    VALIDATE_SQL: "select * from user where username= ? and password =md5(?);",

    create: function (user, callback) {
        callSQL(this.INSERT_SQL,[user.username, user.password],"create",callback)
    },
    getAll: function ( callback) {
        callSQL(this.GETALL_SQL,[],"getAll",callback)

    },
    findByUsername: function (username , callback) {
        callSQL(this.FINDBYUSERNAME_SQL,[username],"finByUsername",callback)

    },
    update: function (user , callback) {
        callSQL(this.UPDATE_SQL,[user.password, user.username],"update",callback)

    },
    delete: function (username , callback) {
        callSQL(this.DELETE_SQL,[username],"delete",callback)

    },
    validate: function (user , callback) {
        callSQL(this.VALIDATE_SQL,[user.username, user.password],"validate",callback)
    }
}
function getConnection(){
    return  mysql.createConnection({
        host:'localhost',
        user:'root',
        password:'',
        database:'softdev3',
    });
}
function handleErrorandLog(err, name, result){
    if(err){
        console.log(err.sql);
        throw err;
    }
    console.log(name+": " + JSON.stringify(result));
}
function callSQL(sql, data, logInfo, callback){
    var con = getConnection();
    con.connect(function (err) {
        if (err) throw err;
        con.query(sql,data, function (err, result) {
            handleErrorandLog(err,logInfo,result);
            if(callback)callback(result);
        });
    });
}






module.exports = userDAO